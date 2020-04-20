Uso detalado del comando t (tirada)
Tiradas de d100, manejo las pifias y abiertas por ti.

```
.t [ [ + | - ] <variable|número> ] ]... [?][<opcion>[=<valor>]]...
```

Puedes cambiar la configuración de la tirada que vas a realizar si colocas un signo de interrogación seguido de una o varias opciones.

**[a]bierta** = si|no (indica si la tirada admite abierta)
**[ra]bierta** = número (Índica el valor desde el cual se admite una abierta.)
**[p]ifia** = si|no (Índica si la tirada admite pifias)
**[rp]ifia** = número (Índica el valor desde el cual se puede pifiar)

**ejemplos:**

`.t +10` tira un d100 y suma 10 al resultado

`.t ataque - 15` tira un d100 y le suma la variable ataque guardada y le resta 15 después.

`.t parada ?p=false o=n` tira un d100 sin pifias ni abiertas (nota que o de 'open' también funciona)

`.t -5 ?rp = 4` tira un d100 pero la pifia ocurre de 4 para abajo (por ejemplo para personajes con mala suerte)

