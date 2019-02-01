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
def pegaLivro (livroData, a):
    livroData = livroData.split(",");
    titulo = livroData[0];
    nome = livroData[1];
    sobrenome = livroData[2];
    edicao = livroData [3];
    editora = livroData[4];
    conn = sqlite3.connect("SQLITE/Livraria.db")
    cursor = conn.cursor ()
    cursor.execute("""SELECT idautor from autor where idcliente = ? and nome = ? and sobrenome = ?""", (a,nome,sobrenome))
    for i in cursor.fetchall():
        idautor = str (i[0])
    cursor.execute ("""SELECT ideditora FROM editora where nome = ? and idcliente = ?;""", (editora,a))
    for i in cursor.fetchall():
        ideditora = str (i[0])
    cursor.execute ("""SELECT idlivro FROM livro where titulo = ? and idcliente = ? and ideditora = ? and idautor = ? and edicao = ?;""", (titulo,a, ideditora, idautor, edicao))
    for i in cursor.fetchall():
        idlivro = str (i[0])
    return idlivro
def main():
    form = cgi.FieldStorage()
    try:
        idcliente = form["id"].value
        clienteData = form["clienteData"].value
        clienteData = clienteData.split(",")
        nome = clienteData[0]
        login = clienteData[1]
        senha = clienteData[2]
        icone = clienteData[3]
        loginAntigo = clienteData[4] 
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT login FROM cliente""")
        for i in cursor.fetchall():
            if str(i[0]) == str(login) != str(loginAntigo):
                display_error ("ERRO LOGIN")
                return
        cursor.execute ("""UPDATE cliente SET nome = ?, login = ?, senha = ?, icone = ? WHERE idcliente = ?""", (nome, login, senha, icone, idcliente))
        conn.commit ()
        display_data ("Sucesso!")
        return;
    except Exception as ierr:
        display_error(str(ierr))
main()