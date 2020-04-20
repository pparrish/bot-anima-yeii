Uso detalado del comando d (diez)
Tiradas de d10, manejo la regla del 10. 
```
.d [ [ + | - ] <variable|número> ] ]... [?][<opcion>[=<valor>]]...
```

Puedes cambiar la configuración de la tirada que vas a realizar si colocas un signo de interrogación seguido de una o varias opciones.

**[a]bierta** = si|no (indica si la tirada admite la regla del 10)
**[ra]bierta** = número (Índica el valor desde el cual se aplica la regla del 10.)
**[p]ifia** = si|no (Índica si la tirada admite la regla del 1)
**[rp]ifia** = número (Índica el valor desde el cual se puede aplicar la regla del 1, inactivo por default)

**ejemplos:**

`.d +10` tira un d10 y suma 10 al resultado

`.d inteligencia - 2` tira un d10 y le suma la variable inteligencia guardada y le resta 2 después.

`.d agilidad ?p=false o=n` tira un d10 sin ninguna regla (nota que o de 'open' también funciona)

`.d -5 ?rp = 4` tira un d10 pero la regla del 1 es aplicada desde que se obtiene 4

