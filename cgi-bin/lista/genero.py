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

def display_data(nome):
    print ("<p>"+nome+"</p>")

def display_error(type):
    print_header()
    print ("<p>"+ type+"</p>");
    print_close()

def main():
    form = cgi.FieldStorage()
    try:
        a = form["Idcliente"].value
        b = form["Tipo"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT nome FROM genero WHERE idcliente = ? order by nome""", a)
        print_header ()
        display_data ("Sucesso!")
        for i in cursor.fetchall():
            display_data(str(i[0]))
        print_close ()
    except Exception as ierr:
        display_error(str(ierr))
main()