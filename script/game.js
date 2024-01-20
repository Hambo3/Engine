class Game{

    constructor()
    {
        this.gravity = 300;
        this.gameObjects = new ObjectPool(); 

        //this.Init();

    }

    Init(){
        var p;
        var col = MAP.area.x;
        var row = MAP.area.y;
        var h = MAP.tileSize/2;

        for(var r = 0; r < row; r++) 
        {
            for(var c = 0; c < col; c++) 
            {
                p = MAP.mapData[r][c];                
                var pt = new Vector2((c * MAP.tileSize)+h, (r * MAP.tileSize)+h);
                if(p>1){
                    for(var i = 0; i < TILES[p].length; i++) {
                        var t = TILES[p][i];
                        this.gameObjects.Add(new Block(pt, t.sprite, t.center, t.z, t.ht));
                    }
                }
             }
        }

        this.player = new Player(new Vector2(24.5*32,18.5*32));
        this.gameObjects.Add(this.player);

        //this.enemy = new AI(new Vector2(20.5*32,18.5*32));
        //this.gameObjects.Add(this.enemy);

        for (var i = 0; i < 0; i++) {
            var p;
            //if(Util.OneIn(2)){
            //    p = new Human(new Vector2(Util.RndI(2,30)*32, Util.RndI(2,6)*32));                
            //}
            //else{
                p = new AI(new Vector2(20.5*32,18.5*32));
            //dw}

            p.target = this.player;
            this.gameObjects.Add(p);
        }
        //this.enemy = new Block(new Vector2(19.5*32,18.5*32), "block2");
        //this.gameObjects.Add(this.enemy);        
    }

    Update(dt)
    {
        var bodies = this.gameObjects.Get();      

        for (var i = 0; i < bodies.length; i++) {
            bodies[i].Update(dt);
        }

        Util.Collisions(bodies);

        this.offset = MAP.ScrollTo(this.player.pos, 0.2);
    }

    Render()
    {
        // var l0 = this.gameObjects.Sorted(l => l.z < 16);
        // var l1 = this.gameObjects.Sorted(l => l.z >= 16 && l.z < 32);
        // var l2 = this.gameObjects.Sorted(l => l.z >= 32);
        // var l3 = this.gameObjects.Sorted(l => l.z >= 48);
        // var l4 = this.gameObjects.Sorted(l => l.z >= 64);
        // var asses = l0.concat(l1, l2, l3, l4);

        var l0 = this.gameObjects.Sorted(l => l.z < 32);
        var l1 = this.gameObjects.Sorted(l => l.z >= 32 && l.z < 64);
        var l2 = this.gameObjects.Sorted(l => l.z >= 64);

        var asses = l0.concat(l1,l2);

        var p = MAP.PreRender();

        var cnt = 0;
        for (var i = 0; i < asses.length; i++) {
            var p1 = Util.IsoPoint(asses[i].pos.x, asses[i].pos.y);
            if((p1.x>MAP.Pos.l && p1.x<MAP.Pos.r) && (p1.y>MAP.Pos.t && p1.y<MAP.Pos.b)){
                asses[i].Render(p.x, p.y);
                cnt++;                
            }            
        }
        DEBUG.Print("OBJ", cnt);
        //var rad = new Vector2(this.player.pos.x - this.enemy.pos.x, this.player.pos.y - this.enemy.pos.y);
        //DEBUG.Print("R", rad.Angle());

        MAP.PostRender();

        SFX.Text("0123456789ABCD",100,100,4); 
        Input.Render();
    }
}