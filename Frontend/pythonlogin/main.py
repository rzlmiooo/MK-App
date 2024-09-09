from flask import Flask, render_template, request, redirect, url_for, session ,  flash ,jsonify,send_from_directory
from flask_mysqldb import MySQL
from .static_routes import static_routes 
from werkzeug.utils import secure_filename 
import MySQLdb.cursors, re, hashlib
from flask_login import  LoginManager,UserMixin,login_required,current_user,login_manager
from urllib.parse import urlparse, urljoin
from dotenv import load_dotenv
import os
import re

load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))

app = Flask(__name__)

app.register_blueprint(static_routes)

app.config['UPLOAD_FOLDER'] =os.getenv ('UPLOAD_FOLDER') 

print("Upload folder is set to:", app.config['UPLOAD_FOLDER'])
# Change this to your secret key (it can be anything, it's for extra protection)
app.secret_key =os.getenv( 'SECRET_KEY')

app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)
@app.route('/')
def index():
    return "Hello, World!"

@app.route('/pythonlogin/admin', methods=['GET', 'POST'])
def admin():
    if 'loggedin' in session and session['role'] == 'admin':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE id = %s', (session['id'],))
        account = cursor.fetchone()
        cursor.execute('SELECT id, username, email, image FROM accounts ORDER BY id DESC LIMIT 10')
        clients = cursor.fetchall()
        try:
            # Retrieve all items with their views and likes
            cursor.execute("SELECT * FROM accounts")
            accounts = cursor.fetchall()

            # Get the count of IDs
            cursor.execute("SELECT COUNT(id) AS user_count FROM accounts")
            counts = cursor.fetchone()
            users = counts['user_count'] if counts else 0
            # Get the count of views
            cursor.execute("SELECT COUNT(views) AS views_count FROM accounts")
            counts = cursor.fetchone()
            views = counts['views_count'] if counts else 0
            # Get the count of likes
             # Get the count of views
            cursor.execute("SELECT COUNT(likes) AS likes_count FROM accounts")
            counts = cursor.fetchone()
            likes = counts['likes_count'] if counts else 0

        except MySQLdb.Error as e:
            # Log or handle the error
            print(f"Database error: {e}")
            users = 0
            accounts = []

        finally:
            cursor.close()
        for client in clients:
               url_for('static', filename=client['image'].replace('static/', '').replace('\\', '/'))
        return render_template('admin/admin.html', username=session['username'],accounts=accounts, users=users,views=views,likes=likes,account=account,clients=clients)
    else:
        flash('Access denied: Admins only!', 'danger')
        return redirect(url_for('login'))

@app.route('/pythonlogin/live_users')
def live_users():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT username, email, image FROM accounts ORDER BY id DESC LIMIT 10')
    clients = cursor.fetchall()
    cursor.close()
    return jsonify(clients)

@app.route('/pythonlogin/', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = %s', (username,))
        account = cursor.fetchone()
        cursor.close()

        if account:
            # Check hashed password
            if (account['password'], password):
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                session['role'] = account['role']
                msg = 'Logged in successfully!'
                if session['role'] == 'admin':
                    return redirect(url_for('admin'))
                else:
                    return render_template('main.html', account=account, msg=msg)
            else:
                msg = 'Incorrect password!'
        else:
            msg = 'Username not found!'

    return render_template('index.html', msg=msg)
@app.route('/pythonlogin/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route('/pythonlogin/register', methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method == 'POST':
        if 'username' in request.form and 'password' in request.form and 'email' in request.form:
            username = request.form['username']
            image = request.files['image']
            password = request.form['password']
            email = request.form['email']
            role = request.form.get('role') 

            connection = mysql.connection
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM accounts WHERE username = %s', (username,))
            account = cursor.fetchone()
            if not os.path.exists(app.config['UPLOAD_FOLDER']):
                os.makedirs(app.config['UPLOAD_FOLDER'])
            if image:
                filename = secure_filename(image.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                print(f"Saving file to: {file_path}")
                file_path = os.path.relpath(file_path, start=os.path.dirname(__file__)) 
                image.save(file_path)
            else:
                file_path = ''

            if account:
                msg = 'Account already exists!'
            elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
                msg = 'Invalid email address!'
            elif not re.match(r'[A-Za-z0-9]+', username):
                msg = 'Username must contain only characters and numbers!'
            elif not username or not password or not email:
                msg = 'Please fill out the form!'
            else:
               with connection.cursor() as cursor:
                sql = """
                INSERT INTO accounts (username, image, password, email, role)
                VALUES (%s, %s, %s, %s, %s)
                """
            cursor.execute(sql, (username, file_path, password, email, role))
            connection.commit()
            msg = 'You have successfully registered !'
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg = msg)

@app.route('/pythonlogin/home')
def home():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE id = %s', (session['id'],))
        account = cursor.fetchone()

        return render_template('main.html', username=session['username'],account=account)
    return redirect(url_for('login'))



@app.route('/pythonlogin/profile/<int:user_id>', methods=['GET', 'POST'])
def profile(user_id):
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE id = %s', (session['id'],))
        account = cursor.fetchone()
        msg = ''

        cursor.execute("UPDATE accounts SET views = views + 1 WHERE id = %s", (user_id,))
        mysql.connection.commit()

        if request.method == 'POST' and 'like' in request.form:
            cursor.execute("UPDATE accounts SET likes = likes + 1 WHERE id = %s", (user_id,))
            mysql.connection.commit()
            msg = 'Profile liked!'

        cursor.close()

        image_path = account['image'].replace('static/', '').replace('\\', '/')
        return render_template('profile.html', account=account,image_path=image_path,msg=msg)
    return redirect(url_for('login'))

@app.route('/pythonlogin/edit-profile/<int:user_id>', methods=['GET', 'POST'])
def edit_profile(user_id):
    if 'loggedin' in session and session['id'] == user_id:
        if request.method == 'POST':
            username = request.form['username']
            email = request.form['email']
            image = request.files['image']
            password = request.form['password']

            if not os.path.exists(app.config['UPLOAD_FOLDER']):
                os.makedirs(app.config['UPLOAD_FOLDER'])
            
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
            print(f"Saving file to: {file_path}")
            image.save(file_path)
            
            cur = mysql.connection.cursor()
            cur.execute("""
                UPDATE accounts
                SET username = %s, email = %s,image = %s,password = %s
                WHERE id = %s
            """, (username, email,password, file_path,user_id))
            mysql.connection.commit()
            cur.close()
            flash('Profile updated successfully!')
            return redirect(url_for('login'))

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM accounts WHERE id = %s", (user_id,))
        account = cur.fetchone()
        cur.close()
        return render_template('edit.html', account=account)
    return redirect(url_for('home'))
if __name__ == '__main__':
    app.run(debug=True)
