/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '👽', 
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'L': '❤',
  };
  
  
  const maps = [];
  
  maps.push(`
    I-------XX
    XXXXXXX-XX
    ---X----XX
    -XXX-XXXXX
    -XXX-XXXXX
    -XXX---XXX
    -XXXXX-XXX
    -------XXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  /*  
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);

  
  maps.push(`
  X-----X-XX
  X-XXX-X-XX
  X-X------X
  X-XXXXXX-X
  I------X-X
  XXXXXXXX-O
  ---XXXXX-X
  XX-------X
  XX-XXXXX-X
  XX-------X
`);

maps.push(`
---X---XXO
-X-X-X-XX-
-X---X----
-XXXXXXXXX
---------X
-XXXXXXX-X
---X---XXX
XX---X-XXX
XX-XXX--X-
XX----X--I
`);
*/