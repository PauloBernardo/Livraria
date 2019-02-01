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
    print_header()
    print ("<p>"+nome+"</p>")
    print_close()

def display_error(type):
    print_header()
    print ("<p>"+ type+"</p>");
    print_close()

def main():
    form = cgi.FieldStorage()
    try:
        a = form["Idcliente"].value
        c = form["nome"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT nome FROM genero WHERE idcliente = ?""", a)
        for i in cursor.fetchall():
            if str(i[0]) == str(c):
                display_error ("ERRO NOME")
                return
        cursor.execute ("""INSERT INTO genero values (null, ?,?);""", (c, a))
        conn.commit ()
        display_data ("Sucesso!");
    except Exception as ierr:
        display_error(str(ierr))
main()