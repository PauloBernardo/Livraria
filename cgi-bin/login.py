#! /usr/bin/python3

import cgi;
import cgitb
import sqlite3
import platform
cgitb.enable()

def print_header():
    if platform.system() == 'Linux':
        print ("""Content-type: text/html;\n
        <!DOCTYPE html>
        <html>
        <body>""")
    else:
        print ("""Content-type: text/html; charset=iso-8859-1\n
        <!DOCTYPE html>
        <html>
        <body>""")

def print_close():
    print ("""</body>
    </html>""")

def display_data(nome, idcliente):
    print_header()
    print ("<p>Sucesso! Nome="+ nome+"=ID="+idcliente+"</p>")
    print_close()

def display_error():
    print_header()
    print ("<p>An Error occurred parsing the parameters passed to this script.</p>")
    print ("<p>Try something like:</p>")
    print ("<p><strong>http://localhost/SimpleCgi.py?param1=1&param2=2</strong></p>")
    print_close()

def main():
    form = cgi.FieldStorage()
    try:
        a = form["login"].value
        b = form["senha"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT nome, login, senha, idcliente FROM cliente;""")
        for i in cursor.fetchall():
            if str(a) == str(i[1]) and not bolean and str(b) == str(i[2]):
                display_data (i[0], str(i[3]))
                bolean = True
        if not bolean:
            display_error()
    except:
        display_error()
main()