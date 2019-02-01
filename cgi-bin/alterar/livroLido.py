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
        c = form["preco"].value
        d = form["data"].value
        idlivro = form["idlivro"].value
        precoAntigo = form["precoAntigo"].value
        dataAntiga = form["dataAntiga"].value
        livroAntigo = form["livroAntigo"].value
        idLivroAntigo = pegaLivro (livroAntigo, a);
        bolean = False
        conn = sqlite3.connect("SQLITE/Livraria.db")
        cursor = conn.cursor()
        cursor.execute ("""SELECT palavrasChave, data, idlivro FROM livroLido WHERE idcliente = ?""", a)
        for i in cursor.fetchall():
            if str(i[0]).find (str(c)) != -1 and str(i[1]) == str(d) and str(i[2]) == idlivro:
                display_error ("ERRO NOME")
                return
        cursor.execute ("""UPDATE livroLido SET palavrasChave = ? , data = ? , idlivro = ? WHERE idcliente = ? and idlivro = ? and palavrasChave = ? and data = ?""", (c,d,idlivro, a, idLivroAntigo, precoAntigo, dataAntiga))
        cursor.execute ("""SELECT livro.titulo, autor.nome, autor.sobrenome, genero.nome, editora.nome, livro.edicao, livro.data, livroLido.palavrasChave, livroLido.data
 FROM livroLido inner join livro on livro.idlivro = livroLido.idlivro 
 inner join autor on autor.idautor = livro.idautor 
 inner join genero on genero.idgenero = livro.idgenero
 inner join editora on editora.ideditora = livro.ideditora
 where livroLido.idcliente = ? and livroLido.palavrasChave = ? and livroLido.data = ? order by livro.titulo;
""", (a, c, d))
        for i in cursor.fetchall():
            #livro = pegaLivro (str(i[2]))
            display_data("Sucesso!"+"-"+str(i[0])+"-"+str(i[2])+", "+str(i[1])+"-"+str(i[3])+"-"+str(i[4])+"-"+str(i[5])+"-"+str(i[6])+"-"+str(i[7])+"-"+str(i[8]))
        conn.commit ()
        return;
    except Exception as ierr:
        display_error(str(ierr))
main()