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

def display_data(icone):
    print_header()
    print ("<p>Sucesso! icone="+ icone+"</p>")
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
        idcliente = form["id"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT nome, login, senha, icone FROM cliente WHERE idcliente = ?;""", idcliente)
        for i in cursor.fetchall():
                display_data (i[0]+"="+i[1]+"="+i[2]+"="+i[3]+"="+idcliente)
    except:
        display_error()
main()