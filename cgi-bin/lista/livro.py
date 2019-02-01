#! /usr/bin/python3
# -*- coding: utf-8 -*-
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
        if b == "normal":
            cursor.execute ("""SELECT titulo, idautor, edicao, ideditora, idlivro, idgenero, data FROM livro WHERE idcliente = ? order by titulo""", a)
            print_header ()
            display_data ("Sucesso!")
            for i in cursor.fetchall():
                nomeAutor = ""
                nomeEditora = ""
                outroCursor = conn.cursor();
                outroCursor.execute ("""SELECT nome FROM genero where idgenero = ? and idcliente = ?;""", (str(i[5]), a))
                for j in outroCursor.fetchall():
                    nomeGenero = str (j[0])
                outroCursor.execute ("""SELECT nome, sobrenome FROM autor where idautor = ? and idcliente = ?;""", (str(i[1]), a))
                for j in outroCursor.fetchall():
                    nomeAutor = str (j[1]) + ", " + str(j[0])
                outroCursor.execute ("""SELECT nome FROM editora where ideditora = ? and idcliente = ?;""", (str(i[3]),a))
                for j in outroCursor.fetchall():
                    nomeEditora = str (j[0])
                display_data(i[0]+"-"+nomeAutor+"-"+nomeGenero+"-"+nomeEditora+"-"+str(i[2])+"-"+str(i[6]))
                print_close ()
            return;
        cursor.execute ("""SELECT titulo, idautor, edicao, ideditora, idlivro FROM livro WHERE idcliente = ? order by titulo""", a)
        print_header ()
        display_data ("Sucesso!")
        for i in cursor.fetchall():
            nomeAutor = ""
            nomeEditora = ""
            outroCursor = conn.cursor();
            outroCursor.execute ("""SELECT nome FROM autor where idautor = ? and idcliente = ?;""", (str(i[1]), a))
            for j in outroCursor.fetchall():
                nomeAutor = str (j[0])
            outroCursor.execute ("""SELECT nome FROM editora where ideditora = ? and idcliente = ?;""", (str(i[3]),a))
            for j in outroCursor.fetchall():
                nomeEditora = str (j[0])
            display_data(str(i[0])+"-"+nomeAutor+"-"+str(i[2])+"-"+nomeEditora+"-"+str(i[4]))
        print_close ()
    except Exception as ierr:
        display_error(str(ierr))
main()