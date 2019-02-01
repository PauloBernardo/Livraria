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
        b = form["titulo"].value
        c = form["edicao"].value
        d = form["data"].value
        e = form["genero"].value
        f = form["editora"].value
        g = form["autor"].value
        h = form["sobrenome"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT idgenero FROM genero where nome = ? and idcliente = ?;""", (e,a))
        for i in cursor.fetchall():
            e = str (i[0])
        cursor.execute ("""SELECT idautor FROM autor where nome = ? and sobrenome = ? and idcliente = ?;""", (g,h, a))
        for i in cursor.fetchall():
            idautor = str (i[0])
        cursor.execute ("""SELECT ideditora FROM editora where nome = ? and idcliente = ?;""", (f,a))
        for i in cursor.fetchall():
            f = str (i[0])
        cursor.execute ("""SELECT titulo, edicao, idautor, ideditora FROM livro WHERE idcliente = ?;""", (a,))
        for i in cursor.fetchall():
            if str(i[0]) == str(b) and str(i[1]) == str(c) and str(i[2]) == str(idautor) and str(i[3]) == str(f):
                display_error ("ERRO NOME")
                return
        cursor.execute ("""INSERT INTO livro values (null, ?,?,?,?, ?, ?, ?);""", (b, c,d, e, f, idautor, a))
        conn.commit ()
        display_data ("Sucesso!");
    except Exception as ierr:
        display_error(str(ierr))
main()