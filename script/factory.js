var COLS = [
    [
        1+48,1+32,1+16,1,
        12+48,12+32,11+32,11+16,
        13+48,13+32
    ]
];
//           0      1       2     3    4       5       6      7      8      9     10     11     12     13     14     15
//           blu1  blu2   purp         pink    red    orng   yell          gr2    tq?    brn    flesh  whit   blck   spec
var PAL =[  "#134","#124","#214","#414","#413","#412","#421","#441","#341","#5a3","#144","#632","#953","#666","#000","#505",
            "#38a","#34a","#53a","#93a","#a38","#a34","#a53","#a93","#8a3","#5b3","#3a9","#742","#c74","#999","#222","#ff3",
            "#6be","#67e","#96e","#d6e","#e6b","#e67","#e96","#ed6","#be6","#5c3","#6ed","#851","#f95","#ccc","#333","#000",
            "#cef","#ccf","#dcf","#fcf","#fce","#fcc","#fdc","#ffc","#dfc","#5d3","#cff","#a61","#fb8","#fff","#555","rgba(100, 100, 100, 0.3)"
];

var C = {
    ASSETS:{
        PLAYER:0,
        SHOT:1,
        ENEMY:2,
        BLOCK:3
    },    
    DIR:{
        NONE:0,
        RIGHT:1,
        LEFT:2,
        UP:3,
        DOWN:4
    }
}

var TILES = [
    [{sprite:null, z: 0, ht:0, center:{x: 0, y:0}}],
    [{sprite:'block1', z: 0, ht:16, center:{x: 0, y:-9}}],
    [{sprite:'block2', z: 0, ht:16, center:{x: 0, y:-9}}],
    [{sprite:'block3', z: 0, ht:16, center:{x: 0, y:-9}}],
    [{sprite:'block4', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block5', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block6', z: 0, ht:32, center:{x: 0, y:-17}},{sprite:'block6', z: 32, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block7', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block8', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block9', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block10', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block11', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block12', z: 0, ht:32, center:{x: 0, y:-17}}],
    [{sprite:'block13', z: 0, ht:32, center:{x: -1, y:-17}}],
    [{sprite:'block14', z: 0, ht:32, center:{x: 0, y:-17}}],
];

var ROOFTOPS = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    [1,2,3,6],
    [1,2,3]
];

var DEF = {
    file:[
        { src:'content/tiles.png', tag:"tile" },
        { src:'content/sprites2.png', tag:"sprite" },
        { src:'content/blocks.png', tag:"block" },
        { src:'content/blocks2.png', tag:"block2" }
    ],
    sprite:
    {
        'tile0':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile1':{ tag:"tile", src:[{x:40,y:0,m:0}],w:40,h:32},
        'tile2':{ tag:"tile", src:[{x:40,y:0,m:0}],w:40,h:32},
        'tile3':{ tag:"tile", src:[{x:40,y:0,m:0}],w:40,h:32},
        'tile4':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile5':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile6':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},

        'tile7':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile8':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile9':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile10':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile11':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile12':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile13':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},
        'tile14':{ tag:"tile", src:[{x:0,y:0,m:0}],w:40,h:32},

        'hero_0':{ tag:"sprite", src:[{x:0,y:0,m:0}],w:36,h:48},
        'hero_1':{ tag:"sprite", src:[{x:36,y:0,m:0}],w:36,h:48},
        'hero_2':{ tag:"sprite", src:[{x:72,y:0,m:0}],w:36,h:48},
        'hero_3':{ tag:"sprite", src:[{x:108,y:0,m:0}],w:36,h:48},
        'hero_4':{ tag:"sprite", src:[{x:144,y:0,m:0}],w:36,h:48},
        'hero_5':{ tag:"sprite", src:[{x:180,y:0,m:0}],w:36,h:48},
        'hero_6':{ tag:"sprite", src:[{x:216,y:0,m:0}],w:36,h:48},
        'hero_7':{ tag:"sprite", src:[{x:252,y:0,m:0}],w:36,h:48},
        'shadow':{ tag:"sprite", src:[{x:0,y:48,m:0}],w:22,h:22},

        'block1':{ tag:"block", src:[{x:0,y:0,m:0}],w:40,h:48},
        'block2':{ tag:"block", src:[{x:40,y:0,m:0}],w:40,h:48},
        'block3':{ tag:"block", src:[{x:80,y:0,m:0}],w:40,h:48},
        'block4':{ tag:"block", src:[{x:120,y:0,m:0}],w:40,h:64},
        'block5':{ tag:"block", src:[{x:160,y:0,m:0}],w:40,h:64},
        'block6':{ tag:"block", src:[{x:200,y:0,m:0}],w:40,h:64},
        'marker':{ tag:"sprite", src:[{x:110,y:0,m:0}],w:40,h:32},
        'block7':{ tag:"block2", src:[{x:0,y:0,m:0}],w:40,h:65},
        'block8':{ tag:"block2", src:[{x:40,y:0,m:0}],w:40,h:64},
        'block9':{ tag:"block2", src:[{x:80,y:0,m:0}],w:40,h:64},
        'block10':{ tag:"block2", src:[{x:120,y:0,m:0}],w:40,h:64},
        'block11':{ tag:"block2", src:[{x:0,y:64,m:0}],w:40,h:64},
        'block12':{ tag:"block2", src:[{x:40,y:64,m:0}],w:40,h:64},
        'block13':{ tag:"block2", src:[{x:80,y:64,m:0}],w:43,h:64},
        'block14':{ tag:"block2", src:[{x:0,y:128,m:0}],w:40,h:64},
    },
    map:{
        size:{
            tile:{width:32, height:32},
            screen:{width:25, height:19},
            world:{width:56, height:32},
            area:{width:50, height:30},
        },
        data:[            
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,5,5,5,5,14,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,13,12,12,12,11,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,10,9,9,9,9,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,3,3,3,3,3,0,0,7,8,8,8,8,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,4,4,4,4,4,0,0,0,0,0,3,3,3,3,3,0,0,0,4,4,4,4,4,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,4,4,4,4,4,0,0,0,6,6,6,6,6,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,5,5,5,5,5,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,5,5,5,5,5,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,2,2,2,0,0,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,2,2,2,2,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]            
        ]
    }
};

var assets ={   
    square:[1,[-16,-16, 16,-16, 16,16, -16,16]],
    rect:[1,[-8,-16, 8,-16, 8,16, -8,16]],
    shot:[1,[-4,-4, 4,-4, 4,4, -4,4]]    
};

var FONT = {    
    'A': [
        [, 1, 0],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1]
    ],
    'B': [
        [1, 1, 0],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, 1,0]
    ],
    'C': [
        [1, 1, 1],
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1, 1, 1]
    ],
    'D': [
        [1, 1,0],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1,0]
    ],
    'E': [
        [1, 1, 1],
        [1,0,0],
        [1, 1, 1],
        [1,0,0],
        [1, 1, 1]
    ],
    'F': [
        [1, 1, 1],
        [1,0,0],
        [1, 1,1],
        [1,0,0],
        [1,0,0]
    ],
    'G': [
        [, 1, 1,0],
        [1,0,0,0],
        [1, , 1, 1],
        [1, , , 1],
        [, 1, 1,0]
    ],
    'H': [
        [1, , 1],
        [1, , 1],
        [1, 1, 1],
        [1, , 1],
        [1, , 1]
    ],
    'I': [
        [1, 1, 1],
        [, 1,0],
        [, 1,0],
        [, 1,0],
        [1, 1, 1]
    ],
    'J': [
        [1, 1, 1],
        [, , 1],
        [, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'K': [
        [1, , , 1],
        [1, , 1,0],
        [1, 1,0,0],
        [1, , 1,0],
        [1, , , 1]
    ],
    'L': [
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1,0,0],
        [1, 1, 1]
    ],
    'M': [
        [1,1,1,1],
        [1,0,1,1],
        [1,0,1,1],
        [1,0,0,1],
        [1,0,0,1]
    ],
    'N': [
        [1, , , 1],
        [1, 1, , 1],
        [1, , 1, 1],
        [1, , , 1],
        [1, , , 1]
    ],
    'O': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'P': [
        [1, 1, 1],
        [1, , 1],
        [1, 1, 1],
        [1,0,0],
        [1,0,0]
    ],
    'Q': [
        [0, 1, 1,0],
        [1, , , 1],
        [1, , , 1],
        [1, , 1, 1],
        [1, 1, 1, 1]
    ],
    'R': [
        [1, 1,0],
        [1, , 1],
        [1, , 1],
        [1, 1,0],
        [1, , 1]
    ],
    'S': [
        [1, 1, 1],
        [1,0,0],
        [1, 1, 1],
        [, , 1],
        [1, 1, 1]
    ],
    'T': [
        [1, 1, 1],
        [, 1,0],
        [, 1,0],
        [, 1,0],
        [, 1,0]
    ],
    'U': [
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    'V': [
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [0, 1, 0]
    ],
    'W': [
        [1, , , 1],
        [1, , , 1],
        [1, , , 1],
        [1, , 1, 1],
        [1, 1, 1,1]
    ],
    'X': [
        [1,0,1],
        [1,0,1],
        [0,1,0],
        [1,0,1],
        [1,0,1]
    ],
    'Y': [
        [1, , 1],
        [1, , 1],
        [, 1,0],
        [, 1,0],
        [, 1,0]
    ],
    'Z': [
        [1, 1, 1],
        [, , 1],
        [, 1,0],
        [1,0,0],
        [1, 1, 1]
    ],
    '0': [
        [1, 1, 1],
        [1, , 1],
        [1, , 1],
        [1, , 1],
        [1, 1, 1]
    ],
    '1': [
        [, 1,0],
        [, 1,0],
        [, 1,0],
        [, 1,0],
        [, 1,0]
    ],
    '2': [
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [1,0,0],
        [1,1,1]
    ],
    '3':[
        [1,1,1],
        [0,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    '4':[
        [1,0,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [0,0,1]
    ],
    '5':[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    '6':[
        [1,1,1],
        [1,0,0],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ],
    '7':[
        [1,1,1],
        [0,0,1],
        [0,0,1],
        [0,0,1],
        [0,0,1]
    ],
    '8':[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ],
    '9':[
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [0,0,1],
        [1,1,1]
    ],
    '[': [
        [,1,1],
        [,1,],
        [,1,],
        [,1,],
        [,1,1]
    ],
    ']': [
        [1,1,],
        [,1,],
        [,1,],
        [,1,],
        [1,1,]
    ],
    ' ': [
        [, ,],
        [, ,],
        [, ,],
        [, ,],
        [, ,]
    ],
    '?': [
        [1,1,1],
        [1,0,1],
        [0,1,1],
        [0,1,0],
        [0,1,0]
    ],
    '.': [
        [, ,],
        [, ,],
        [, ,],
        [, ,],
        [,1,]
    ],
    '£':
    [
        [0,1,1],
        [0,1,],
        [1,1,1],
        [0,1,0],
        [1,1,1]
    ],
    '+':[]
};