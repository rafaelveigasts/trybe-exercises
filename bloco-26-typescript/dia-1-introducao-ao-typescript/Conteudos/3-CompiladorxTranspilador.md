## Diferença entre Compilador e Transpilador

Um Compilador é um programa que traduz o código desenvolvido usando uma linguagem de mais alto nível (mais próxima dos seres humanos) em um código de um programa equivalente de uma linguagem de mais baixo nível (mais próxima do processador). Como exemplo temos o GCC da Linguagem C e o Javac da linguagem Java .

Um Transpilador é um programa de sistema que traduz o código desenvolvido utilizando uma linguagem de mais alto nível em um código de um programa equivalente de uma outra linguagem de mais alto nível , ou em uma versão diferente da mesma linguagem . Como exemplo temos o J2CL que transpila código na linguagem Java para a linguagem JavaScript ou o Babel que transpila código EcmaScript 6 para EcmaScript 5 por exemplo.

Um Transpilador também é considerado por alguns um tipo de Compilador que atua em um nível mais alto de abstração. Por isso muitas vezes você verá pessoas dizendo que o TypeScript é uma linguagem transpilada por traduzir código TypeScript em código JavaScript , ambas linguagens de mais alto nível.

O Typescript no entanto possui um Compilador denominado TSC (TypeScript Compiler) , responsável por fazer essa tradução e a própria documentação da linguagem trata esse processo de tradução do código feito pelo TSC como compilação. Vamos estudar mais sobre ele na próxima sessão.