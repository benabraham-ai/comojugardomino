#!/usr/bin/env python3
"""
SEO meta title + description optimizer for comojugardomino.
Updates frontmatter title/description in all es.mdx files.
"""

import re
from pathlib import Path

BASE = Path("/Users/macmini/projects/comojugardomino/content/posts")

# slug -> (title, description)
# Title: 50-60 chars | Description: 150-160 chars
SEO = {
    "adaptacion-tactica-domino-parejas": (
        "Adaptación Táctica en Dominó en Parejas: Cómo Cambiar",
        "No basta con tener estrategia — hay que saber cuándo cambiarla. Guía completa de adaptación táctica en dominó en parejas para dominar cualquier situación.",
    ),
    "ahorcar-un-doble": (
        "Ahorcar un Doble en Dominó: Cómo Atrapar al Rival",
        "Aprende a ahorcar un doble en dominó en parejas: detecta cuándo tu rival está atrapado y cierra el palo para forzar su pegada. Guía táctica completa.",
    ),
    "arte-del-tranque": (
        "El Arte del Tranque: Cómo Cerrar la Mesa y Ganar",
        "Dominar el tranque en dominó venezolano es saber cuándo cerrar la mesa. Aprende cuándo provocarlo, cuándo evitarlo y cómo ganar más manos con esta táctica.",
    ),
    "candado-domino": (
        "El Candado en Dominó: Cierra el Juego con tu Pareja",
        "El candado es la jugada más letal del dominó en pareja. Aprende cómo coordinarlo con tu compañero para cerrar el juego antes de que los rivales reaccionen.",
    ),
    "capicua": (
        "Capicúa en Dominó: La Jugada Más Celebrada del Juego",
        "La capicúa es el momento más celebrado del dominó venezolano. Aprende qué es, cuándo ocurre y por qué es la jugada más satisfactoria que puedes hacer.",
    ),
    "capicua-pollona-tranca-domino": (
        "Capicúa, Pollona y Tranca: Los Momentos del Dominó",
        "Qué es la capicúa, la tranca y la pollona en el dominó en parejas: los tres momentos más celebrados y más temidos de la mesa. Aprende a reconocerlos.",
    ),
    "cierre-perfecto-domino": (
        "El Cierre Perfecto: Domina el Final de Mano en Dominó",
        "Aprende a ejecutar el cierre perfecto en dominó: controla el tablero en los últimos turnos, bloquea rivales y gana con tus últimas fichas. Estrategia avanzada.",
    ),
    "como-jugar-domino": (
        "Cómo Jugar Dominó: Guía Completa para Principiantes",
        "Aprende a jugar dominó desde cero: reglas básicas, cómo se reparten las fichas, quién empieza y cómo ganar. La guía definitiva para principiantes en español.",
    ),
    "comunicacion-pareja": (
        "Comunicación en Pareja: El Lenguaje Secreto del Dominó",
        "En dominó en parejas, no puedes hablar — pero sí comunicarte. Aprende el lenguaje silencioso de las fichas y coordina con tu compañero sin decir una palabra.",
    ),
    "contar-fichas": (
        "Contar Fichas en Dominó: Memoria, Cálculo y Ventaja",
        "El dominó no es suerte — es información. Aprende a contar fichas en dominó venezolano para saber qué tiene el rival y dominar la mesa con datos, no adivinanzas.",
    ),
    "conteo-fichas-domino-pareja": (
        "Cómo Contar Fichas en Dominó en Pareja: Guía Completa",
        "El tablero es un sistema de 28 fichas. Aprende a contarlas en dominó en pareja: técnicas de memorización, probabilidades y cómo usar la información para ganar.",
    ),
    "controlar-cabezas-domino": (
        "Controlar las Cabezas en Dominó: El Secreto del Tablero",
        "Las cabezas del tablero son los extremos abiertos del juego. Aprende a controlarlas en dominó en pareja para dictar el ritmo y ganar más manos seguidas.",
    ),
    "cuando-tu-pareja-esta-pegada": (
        "Cuando tu Pareja Está Pegada: Estrategia de Rescate",
        "Tu compañero está pegado y no puede jugar. Aprende las mejores estrategias de rescate en dominó en parejas: cómo abrir palos, leer la mesa y salvar la mano.",
    ),
    "defender-el-punto-domino": (
        "Defender el Punto en Dominó: Cómo No Regalar la Ventaja",
        "Vas ganando 80-20 y todavía lo pierdes. Aprende a defender el marcador en dominó en parejas y proteger tu ventaja sin regalarle la vuelta a los rivales.",
    ),
    "doble-blanco-domino-parejas": (
        "El Doble Blanco en Dominó: La Ficha Más Engañosa",
        "Cero puntos, máximo impacto. Aprende cómo usar el doble blanco en dominó en parejas para bloquear rivales, proteger a tu pareja y cerrar manos clave.",
    ),
    "doble-seis": (
        "El Doble-Seis en Dominó Venezolano: Por Qué Todo Cambia",
        "La mula de seis es la ficha más importante del dominó venezolano. Aprende su peso estratégico, cuándo guardarla y por qué abre cada primera mano del match.",
    ),
    "domino-caribe": (
        "El Dominó en el Caribe: De los Patios a los Torneos",
        "El dominó une al Caribe de una punta a la otra. Descubre la historia, los torneos y la cultura del dominó caribeño desde Cuba hasta Trinidad y Tobago.",
    ),
    "domino-colombiano": (
        "Dominó Colombiano: Reglas y Cultura de la Costa Caribe",
        "Aprende cómo se juega el dominó colombiano: reglas, variantes regionales y por qué la Costa Caribe lo convirtió en un deporte serio en toda América Latina.",
    ),
    "domino-cubano": (
        "El Dominó Cubano: La Variante que Conquistó Miami",
        "El dominó cubano llegó a Miami con los exilios y nunca se fue. Aprende sus reglas, diferencias con el venezolano y por qué en La Calle Ocho suena distinto.",
    ),
    "domino-diaspora-latina": (
        "El Dominó en la Diáspora Latina: Del Caribe al Asfalto",
        "Del Caribe al asfalto de Nueva York: cómo el dominó viajó con la diáspora latina, sobrevivió el viaje y se convirtió en seña de identidad cultural.",
    ),
    "domino-dominicano": (
        "Dominó Dominicano: Reglas, Cultura y Secretos del Caribe",
        "Aprende las reglas del dominó dominicano: variantes como el Pintintín, jugadas especiales y por qué RD tiene la cultura dominera más intensa del Caribe.",
    ),
    "domino-online-parejas": (
        "Dominó en Parejas Online: Cómo Es la Experiencia",
        "Dominó en Parejas online o en persona: comparamos experiencia, estrategia y comunidad. Descubre qué cambia y qué se mantiene cuando juegas en digital.",
    ),
    "domino-online-vs-presencial": (
        "Dominó Online vs. Presencial: Lo que Cambia y lo que No",
        "¿Jugar dominó en parejas online es igual que en la mesa? Descubre qué estrategias cambian, qué se mantiene y por qué el juego online tiene su propio código.",
    ),
    "domino-panameno": (
        "Dominó Panameño: El País que Produjo un Campeón Mundial",
        "Descubre cómo Panamá convirtió el dominó en un deporte de campeones. Del Parque de Los Aburridos a Luis Cantillo, campeón mundial 2022. Una historia de orgullo.",
    ),
    "domino-puertorriqueno": (
        "El Dominó Puertorriqueño: Familia, Patio y Doble-Nueve",
        "En Puerto Rico, el dominó es asunto de familia. Aprende sus reglas con doble-nueve, las diferencias con el venezolano y la tradición del patio boricua.",
    ),
    "domino-venezuela": (
        "Cómo el Dominó Se Convirtió en el Alma de Venezuela",
        "El dominó no es solo un juego en Venezuela — es una forma de vida. Descubre cómo la ficha se convirtió en el símbolo más poderoso de la cultura venezolana.",
    ),
    "el-levante-domino": (
        "El Levante en Dominó: Cómo Leer tus 7 Fichas al Inicio",
        "Antes de jugar la primera ficha, ya hay información. Aprende a hacer el levante en dominó en parejas: analiza dobles, fallas y palos fuertes antes de la salida.",
    ),
    "errores-en-pareja": (
        "7 Errores Comunes en Dominó en Pareja (y Cómo Evitarlos)",
        "¿Tu pareja te mira raro después de cada jugada? Aprende los 7 errores más comunes en el dominó en pareja y cómo dejar de cometerlos de una vez por todas.",
    ),
    "estrategia-basica-domino-venezolano": (
        "Estrategia Básica del Dominó Venezolano: El Manual",
        "Las 5 estrategias fundamentales del dominó en parejas venezolano: contar fichas, señalizar al compañero, bloquear palos, soltar dobles y leer el final de mano.",
    ),
    "estrategia-ceros-domino-venezolano": (
        "Los Ceros en Dominó Venezolano: Cuándo Fincar a Blanco",
        "Aprende la estrategia de los ceros en dominó venezolano: cuándo fincar a blanco, cómo usar el doble cero y comunicarle a tu pareja que controlas el palo.",
    ),
    "estrategia-dobles-domino": (
        "Estrategia de los Dobles en Dominó: Cuándo Jugarlos",
        "Aprende cuándo jugar los dobles (mulas) y cuándo guardarlos en el dominó en pareja. La guía definitiva para dominar las fichas más poderosas del juego.",
    ),
    "estrategias-para-ganar": (
        "5 Estrategias Probadas para Ganar al Dominó Venezolano",
        "Deja de depender de la suerte. Estas 5 estrategias probadas te ayudarán a ganar más partidas de dominó venezolano: desde contar fichas hasta leer al rival.",
    ),
    "fallas-domino-parejas": (
        "Fallas en Dominó en Parejas: La Ventaja que Nadie Usa",
        "Aprende a identificar y explotar las fallas en dominó en parejas. Detecta los números que los rivales no tienen y úsalos para cerrar palos y ganar más manos.",
    ),
    "faroleo-domino-parejas": (
        "El Faroleo en Dominó: El Arte de Engañar sin Mentir",
        "El faroleo es la táctica más temida del dominó en parejas. Aprende a usarlo para confundir rivales, proteger a tu compañero y tomar el control de la mesa.",
    ),
    "fichas-pesadas-estrategia": (
        "Fichas Pesadas en Dominó: Cuándo Jugarlas y Cuándo No",
        "Aprende la estrategia de las fichas pesadas en dominó: cuándo jugarlas temprano para deshacerte de los puntos y cuándo retenerlas para ganar la partida.",
    ),
    "gestion-marcador-domino-parejas": (
        "Gestión del Marcador en Dominó: Cambia tu Estrategia",
        "Aprende a ajustar tu estrategia en dominó en parejas según el puntaje. De 0-0 a match point: cada fase del partido exige una mentalidad y un plan diferentes.",
    ),
    "juego-defensivo-domino": (
        "Juego Defensivo en Dominó: Cómo Bloquear y Ganar",
        "Aprende el juego defensivo en dominó: bloquea al rival, controla el tablero y gana sin necesitar la mano perfecta. Guía completa con estrategias reales.",
    ),
    "juego-ofensivo-domino-parejas": (
        "Juego Ofensivo en Dominó en Parejas: Cuándo Atacar",
        "Aprende cuándo y cómo jugar ofensivo en dominó en parejas: cierra palos del rival, asfixia los dobles y toma el control de la mesa desde la primera ficha.",
    ),
    "la-pensada-domino-venezolano": (
        "La Pensada: El Arma Secreta del Dominó Venezolano",
        "La pensada en dominó venezolano revela más que mil palabras. Aprende a leer el tiempo que tarda cada rival y convierte esa información en ventaja real.",
    ),
    "la-tenaza-domino-parejas": (
        "La Tenaza: Controla Ambos Extremos y Atrapa al Rival",
        "Aprende la tenaza en dominó en parejas: controla ambos extremos del tablero con tu equipo, fuerza los pases del rival y cierra la mano antes de que reaccionen.",
    ),
    "leer-mano-companero-domino": (
        "Cómo Leer la Mano de tu Compañero sin que te lo Diga",
        "Aprende a inferir las fichas de tu pareja en dominó en pareja: qué revelan sus jugadas, sus pasos y sus silencios. Estrategia avanzada para ganar más.",
    ),
    "lenguaje-secreto-domino": (
        "El Lenguaje Secreto del Dominó: Tus Manos Hablan",
        "En la mesa de dominó, tu cuerpo habla antes que tus fichas. Aprende el lenguaje secreto del dominó para leer rivales y controlar lo que revelas de ti mismo.",
    ),
    "mano-debil-domino-parejas": (
        "Mano Débil en Dominó en Parejas: Cómo Sobrevivir",
        "¿Te tocaron mal las fichas en dominó? Aprende cómo jugar con mano débil en parejas y convertir la desventaja en oportunidad con las estrategias correctas.",
    ),
    "matematica-secreta-domino": (
        "La Matemática Secreta del Dominó: Probabilidad y Conteo",
        "Descubre cómo la probabilidad y el conteo de fichas en el dominó venezolano transforman cada jugada. Aprende a calcular, anticipar y ganar con información.",
    ),
    "palos-fuertes-debiles": (
        "Palos Fuertes y Débiles en Dominó: Cómo Leer tu Mano",
        "Aprende a identificar tus palos fuertes y débiles en el dominó en pareja. Estrategia clave para leer tu mano y dominar la mesa desde la primera ficha.",
    ),
    "posicion-en-la-mesa": (
        "Posición en la Mesa: Cómo tu Asiento Afecta tu Dominó",
        "En dominó en pareja, dónde te sientas importa tanto como lo que tienes en la mano. Aprende cómo tu posición en la mesa cambia tu estrategia y tus opciones.",
    ),
    "primer-turno": (
        "El Primer Turno en Dominó: La Primera Ficha lo Define Todo",
        "La primera ficha marca el ritmo de toda la mano. Aprende a aprovechar el primer turno en dominó en parejas para sentar las bases de la victoria desde el inicio.",
    ),
    "primera-mano-domino-venezolano": (
        "Primera Mano en Dominó Venezolano: De la Salida al Dominó",
        "Aprende a jugar dominó venezolano paso a paso: desde la mula de seis hasta el dominó final. Una mano completa explicada ficha por ficha para principiantes.",
    ),
    "psicologia-rival": (
        "Leer al Rival en Dominó: La Psicología que Nadie Enseña",
        "Las fichas dicen mucho, pero la persona que las juega dice más. Aprende a leer la psicología de tus rivales en el dominó y ganar con información invisible.",
    ),
    "puntaje-critico-domino": (
        "Puntaje Crítico en Dominó: Cómo Jugar Cuando Todo Importa",
        "Cuando el marcador supera los 80 en dominó en parejas, el juego cambia por completo. Aprende las tácticas de endgame que separan a los buenos de los grandes.",
    ),
    "puntuacion-domino-venezolano": (
        "Puntuación en Dominó Venezolano: Cómo Se Gana el Match",
        "Entiende la puntuación del dominó venezolano: cómo se cuentan los puntos en dominó y tranca, qué pasa en el empate, y cómo llegar primero a 100 puntos.",
    ),
    "que-es-domino-venezolano": (
        "Qué Es el Dominó Venezolano: Guía para Entenderlo",
        "El dominó venezolano no es el dominó que conoces: 4 jugadores, 2 equipos, 28 fichas repartidas, sin boneyard. Aquí te explicamos exactamente qué lo hace único.",
    ),
    "reglas-basicas": (
        "Reglas del Dominó en Parejas: Todo lo que Debes Saber",
        "El dominó en pareja es estrategia, lectura y trabajo en equipo. Aprende las reglas completas: fichas, reparto, turnos, dominó, tranca y cómo se puntúa.",
    ),
    "reglas-domino-parejas": (
        "Reglas Completas del Dominó en Parejas para Latinoamérica",
        "La modalidad más popular del dominó en Latinoamérica, explicada de principio a fin: reglas en pareja, comunicación entre compañeros y estrategia de equipo.",
    ),
    "remontada-domino-venezolano": (
        "Cómo Remontar en Dominó Venezolano: Estrategia Real",
        "Cuando vas perdiendo en dominó venezolano, todavía hay opciones. Aprende a remontar: controla palos, comunícate con tu pareja y lee el marcador para ganar.",
    ),
    "sacrificio-estrategico-domino": (
        "El Sacrificio en Dominó: Pierde una Ficha, Gana la Mano",
        "Aprende cuándo sacrificar fichas de alto valor en dominó en parejas para controlar el tablero, cerrar palos y salvar a tu compañero. Estrategia avanzada.",
    ),
    "salida-dos-caras-domino": (
        "Salida a Dos Caras en Dominó: Domina desde el Inicio",
        "Aprende qué es la salida a dos caras en dominó venezolano, cómo dominar ambos extremos del tablero desde la primera jugada y cuándo aplicarla para ganar.",
    ),
    "supersticiones-domino": (
        "Las Supersticiones del Dominó: Rituales que Todos Hacen",
        "Antes de tirar la primera ficha, ya hay rituales. Conoce las supersticiones más comunes del dominó venezolano: los que nadie admite pero todos practican.",
    ),
    "tells-digitales-domino-online": (
        "Tells Digitales: Lee a tu Rival en el Dominó Online",
        "Aprende a detectar tells digitales en dominó en parejas online: tiempo de respuesta, patrones de juego y señales que revelan la mano de tu rival en pantalla.",
    ),
    "tempo-ritmo-domino-parejas": (
        "El Tempo en Dominó en Parejas: Ritmo y Presión Psicológica",
        "Controlar el tempo en dominó en parejas puede desequilibrar a tus rivales. Aprende a manejar velocidad, ritmo y presión psicológica para dominar la mesa.",
    ),
    "tilt-mental-domino-parejas": (
        "Tilt Mental en Dominó en Parejas: Controla tus Emociones",
        "El tilt destruye más partidas que las malas fichas. Aprende a controlar tus emociones en el dominó en parejas y jugar tu mejor juego bajo presión real.",
    ),
    "tipos-de-jugadores-domino": (
        "Los 5 Tipos de Jugador que Encontrarás en el Dominó",
        "¿Cuál tipo de jugador eres tú? Conoce los 5 arquetipos del dominó en parejas: el Cazador, el Calculador, el Compañerista, el Aventurero y el Bloqueador.",
    ),
    "torneos-domino": (
        "De la Mesa al Torneo: Cómo Se Juega Dominó en Serio",
        "Hay una diferencia entre jugar dominó y competir en dominó. Aprende qué cambia en los torneos: reglas, mentalidad y lo que necesitas para jugar en serio.",
    ),
    "tranca-vs-domino-cuando-elegir": (
        "¿Tranca o Dominó? Cómo Decidir en el Momento Crítico",
        "La decisión más difícil del dominó en parejas: ¿fuerzas la tranca o vas por el dominó? Aprende a leer la mesa y elegir correctamente cuando más importa.",
    ),
    "ultimas-fichas-domino-parejas": (
        "Las Últimas Fichas en Dominó: Cómo Cerrar Victorioso",
        "Cuando quedan pocas fichas en dominó, el juego cambia. Aprende a leer el endgame en parejas, calcular lo que queda y cerrar victorioso cuando más importa.",
    ),
    "variantes-regionales": (
        "Variantes Regionales del Dominó: Un Juego, Mil Formas",
        "El dominó viajó por todo el Caribe y cambió en cada país que tocó. Descubre las variantes regionales del dominó: de Cuba a Venezuela, de RD a Puerto Rico.",
    ),
}


def update_frontmatter(path: Path, new_title: str, new_desc: str) -> bool:
    """Update title and description in YAML frontmatter. Returns True if changed."""
    text = path.read_text(encoding="utf-8")

    if not text.startswith("---"):
        print(f"  SKIP (no frontmatter): {path}")
        return False

    # Find frontmatter block
    end = text.index("---", 3)
    front = text[3:end]
    body = text[end:]

    # Replace title line
    front = re.sub(
        r'^title:.*$',
        f'title: "{new_title}"',
        front,
        flags=re.MULTILINE,
    )

    # Replace description — may be multi-line (indented continuation lines)
    # Match: description: "..." possibly spanning multiple lines with leading spaces
    front = re.sub(
        r'^description:.*?(?=\n\S|\Z)',
        f'description: "{new_desc}"',
        front,
        flags=re.MULTILINE | re.DOTALL,
    )

    new_text = "---" + front + body
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main():
    updated = 0
    skipped = 0
    errors = []

    print(f"Processing {len(SEO)} articles...\n")

    for slug, (title, desc) in sorted(SEO.items()):
        mdx = BASE / slug / "es.mdx"
        if not mdx.exists():
            errors.append(f"NOT FOUND: {slug}")
            continue

        title_len = len(title)
        desc_len = len(desc)
        warn = ""
        if title_len > 60:
            warn += f" [TITLE {title_len}!]"
        if desc_len < 150 or desc_len > 160:
            warn += f" [DESC {desc_len}!]"

        changed = update_frontmatter(mdx, title, desc)
        status = "✓" if changed else "="
        print(f"  {status} {slug:<42} title={title_len} desc={desc_len}{warn}")
        if changed:
            updated += 1
        else:
            skipped += 1

    print(f"\nDone. Updated: {updated} | Unchanged: {skipped}")
    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors:
            print(f"  {e}")


if __name__ == "__main__":
    main()
