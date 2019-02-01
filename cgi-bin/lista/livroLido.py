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
def pegaLivro (idlivro):
    conn = sqlite3.connect("SQLITE/Livraria.db")
    cursor = conn.cursor()
    cursor.execute ("""SELECT titulo, idautor, edicao, ideditora, idlivro, idgenero, data FROM livro where idlivro = ?""", idlivro)
    for i in cursor.fetchall():
        nomeAutor = ""
        nomeEditora = ""
        outroCursor = conn.cursor();
        outroCursor.execute ("""SELECT nome FROM genero where idgenero = ?""", (str(i[5]),))
        for j in outroCursor.fetchall():
            nomeGenero = str (j[0])
        outroCursor.execute ("""SELECT nome, sobrenome FROM autor where idautor = ?;""", (str(i[1]), ))
        for j in outroCursor.fetchall():
            nomeAutor = str (j[1]) + ", " + str(j[0])
        outroCursor.execute ("""SELECT nome FROM editora where ideditora = ?;""", (str(i[3]),))
        for j in outroCursor.fetchall():
            nomeEditora = str (j[0])
        return str(i[0])+"-"+nomeAutor+"-"+nomeGenero+"-"+nomeEditora+"-"+str(i[2])+"-"+str(i[6])
def main():
    form = cgi.FieldStorage()
    try:
        a = form["Idcliente"].value
        b = form["Tipo"].value
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        if b == "normal":
            cursor.execute ("""SELECT livro.titulo, autor.nome, autor.sobrenome, genero.nome, editora.nome, livro.edicao, livro.data, livroLido.palavrasChave, livroLido.data
 FROM livroLido inner join livro on livro.idlivro = livroLido.idlivro 
 inner join autor on autor.idautor = livro.idautor 
 inner join genero on genero.idgenero = livro.idgenero
 inner join editora on editora.ideditora = livro.ideditora
 where livroLido.idcliente = ? order by livro.titulo;
""", a)
        elif b == "preco":
            cursor.execute ("""SELECT livro.titulo, autor.nome, autor.sobrenome, genero.nome, editora.nome, livro.edicao, livro.data, livroLido.palavrasChave, livroLido.data
 FROM livroLido inner join livro on livro.idlivro = livroLido.idlivro 
 inner join autor on autor.idautor = livro.idautor 
 inner join genero on genero.idgenero = livro.idgenero
 inner join editora on editora.ideditora = livro.ideditora
 where livroLido.idcliente = ? order by livroLido.data;
""", a)
        print_header ()
        display_data ("Sucesso!")
        for i in cursor.fetchall():
            #livro = pegaLivro (str(i[2]))
            display_data(str(i[0])+"-"+str(i[2])+", "+str(i[1])+"-"+str(i[3])+"-"+str(i[4])+"-"+str(i[5])+"-"+str(i[6])+"-"+str(i[7])+"-"+str(i[8]))
            print_close ()
        return;
    except Exception as ierr:
        display_error(str(ierr))
main()