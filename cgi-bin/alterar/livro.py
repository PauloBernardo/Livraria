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
        a = form["Idcliente"].value
        livro = form["livro"].value
        livro = livro.split (",");
        titulo = livro [0];
        nome = livro [1];
        sobrenome = livro [2];
        genero = livro[3];
        edicao = livro[4];
        editora = livro [5];
        data = livro[6];
        livroAntigo = form["livroAntigo"].value
        idLivroAntigo = pegaLivro (livroAntigo, a);
        bolean = False

        #Verificando se já existe esse livro
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT idgenero FROM genero where nome = ? and idcliente = ?;""", (genero,a))
        for i in cursor.fetchall():
            idgenero = str (i[0])
        cursor.execute ("""SELECT idautor FROM autor where nome = ? and sobrenome = ? and idcliente = ?;""", (nome,sobrenome, a))
        for i in cursor.fetchall():
            idautor = str (i[0])
        cursor.execute ("""SELECT ideditora FROM editora where nome = ? and idcliente = ?;""", (editora,a))
        for i in cursor.fetchall():
            ideditora = str (i[0])
        cursor.execute ("""SELECT titulo, edicao, idautor, ideditora FROM livro WHERE idcliente = ?;""", (a,))
        for i in cursor.fetchall():
            if str(i[0]) == str(titulo) and str(i[1]) == str(edicao) and str(i[2]) == str(idautor) and str(i[3]) == str(ideditora):
                display_error ("ERRO NOME")
                return

        #atualizando livro;
        cursor.execute ("""UPDATE livro SET titulo = ?, idautor = ?, idgenero = ?, ideditora = ?, edicao = ?, data = ? WHERE idcliente = ? and idlivro = ?""", (titulo, idautor, idgenero, ideditora, edicao, data, a, idLivroAntigo))

        #pegando o recem criado livro!
        cursor.execute ("""SELECT livro.titulo, autor.nome, autor.sobrenome, genero.nome, editora.nome, livro.edicao, livro.data
 FROM livro inner join autor on autor.idautor = livro.idautor 
 inner join genero on genero.idgenero = livro.idgenero
 inner join editora on editora.ideditora = livro.ideditora
 where livro.idcliente = ? and livro.idlivro = ? order by livro.titulo;
""", (a, idLivroAntigo))
        for i in cursor.fetchall():
            #livro = pegaLivro (str(i[2]))
            display_data("Sucesso!"+"-"+str(i[0])+"-"+str(i[2])+", "+str(i[1])+"-"+str(i[3])+"-"+str(i[4])+"-"+str(i[5])+"-"+str(i[6]))
        conn.commit ()
        return;
    except Exception as ierr:
        display_error(str(ierr))
main()