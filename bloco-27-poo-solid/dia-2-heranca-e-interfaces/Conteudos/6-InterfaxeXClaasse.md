## Interfaces versus Classes

Interfaces e (super)classes podem servir para especificar o comportamento de classes, mas de formas e em níveis distintos.

Quando utilizamos interfaces, o que queremos é garantir que alguns atributos e métodos existam, sem se importar com o que fazem.

É mais um "me arranja alguma entidade que tenha o método x , pois eu vou precisar chamar x , e se ele não existir vai dar erro".

Já quando utilizamos a herança, disponibilizamos não só um contrato, mas uma base já implementada de código que funciona, de forma que apenas vamos especializar esta base de código adicionando novas funcionalidades.

Existe uma forma de criar classes que precisam obrigatoriamente implementar alguns métodos em específico, as chamadas classes abstratas, que você conhecerá amanhã 😉.
