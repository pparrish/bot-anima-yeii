Uso detallado del comando ficha.
Recibe una ficha de anima para ser procesada y guardandola para ti, las caracteristicas y habilidades quedaran guardadas como variables.

```
.ficha [nombre] || adjuntar una ficha de anima.
o 
.ficha [nombre] || adjuntar una imagen.
```

El comando ficha tiene varios modos.
1. Si usas el comando sin adjuntar ningun archivo ni un nombre, entonces te mostrara una lista de todas fichas que haz creado.
2. Si usas el comando con un nombre de ficha cambiaras a la ficha con dicho nombre, las variables se guardan por ficha asi que al cambiar todas seran diferentes. Si no existe la ficha, se creara una nueva, vacia y con ese nombre.
3. Si envias una ficha de anima la ficha sera procesada, adicionalmente puedes colocar un nombre para que la ficha sea guardada con ese nombre.*
4. Si envias una imagen, esta se convertira en la imagen que aparecera en tus tiradas junto con el nombre de tu ficha. Adicionalmente puedes colocar un nombre para que sea guardada con ese nombre.*

* Al colocar un nombre siempre cambiaras a la ficha con el nombre que colocaste.

El sistema busca palabras comunes a tu busqueda, por lo que algunas busquedas no generarán una ficha, usa `.ficha <busqueda> ?f` para forzar a crear una ficha nueva

Todo usuario inicia con la ficha default.

