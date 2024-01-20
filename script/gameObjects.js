class Vector2 
{
    constructor(x=0, y=0) { this.x = x; this.y = y; }
    Copy(v)               { this.x = v.x; this.y = v.y; return this; }
    Clone(s=1)            { return (new Vector2(this.x, this.y)).Multiply(s); }
	Add(v)                { (v instanceof Vector2)? (this.x += v.x, this.y += v.y) : (this.x += v, this.y += v); return this;  }
	Subtract(v)           { (this.x -= v.x, this.y -= v.y) ; return this;  }
	Multiply(v)           { (v instanceof Vector2)? (this.x *= v.x, this.y *= v.y) : (this.x *= v, this.y *= v); return this;  }
	Set(x, y)             { this.x = x; this.y = y; return this;  }
    AddXY(x, y)           { this.x += x; this.y += y; return this;  }
    Normalize(scale=1)    { let l = this.Length();  return l > 0 ? this.Multiply(scale/l) : this.Set(scale,y=0);  }
    ClampLength(length)   { let l = this.Length(); return l > length ? this.Multiply(length/l) : this; }
    Rotate(a)             { let c=Math.cos(a);let s=Math.sin(a);return this.Set(this.x*c - this.y*s,this.x*s - this.y*c); }
    Round()               { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
    Length()              { return Math.hypot(this.x, this.y ); }
    Distance(v)           { return Math.hypot(this.x - v.x, this.y - v.y ); }
    Angle()               { return Math.atan2(this.y, this.x); };
    Rotation()            { return (Math.abs(this.x)>Math.abs(this.y))?(this.x>0?2:0):(this.y>0?1:3); }   
    Lerp(v,p)             { return this.Add(v.Clone().Subtract(this).Multiply(p)); }
    DotProduct(v)         { return this.x*v.x+this.y*v.y; }
}

class Timer{
    constructor(t){
        this.start = t;
        this.time = t;
        this.enabled = t>0;
    }

    get Start(){
        return this.start;
    }

    get Value(){
        return this.time;
    }

    Set(t){
        this.time = t;
        this.enabled = t>0;
    }
    Update(dt){
        var r = false;
        if(this.enabled){
            this.time -= dt;

            if(this.time <= 0)
            {
                this.time = 0;
                this.enabled = false;
                r = true;
            }
        }
        return r;
    }
}

class GameObjectBase{

    constructor(pos, type)
    {
        this.type = type;
        this.enabled = true;
        this.pos = pos;	
        this.velocity = new Vector2();
        this.body;
        this.frame = 0;
        this.direction = {v:0,h:1};
        this.speed = 0;
        this.damping = 0.8;
        this.bounds = {t:0,b:0,l:0,r:0};
        this.hits = [];
        this.center;
        this.z = 0;
    }

    Update(dt){
    }

    get Body() {
        return SPRITES.Get(this.body, this.frame);
    }

    Render(x,y){
        if(this.enabled){
            var pt = Util.IsoPoint(this.pos.x, this.pos.y);
            //GFX.Sprite(pt.x-x, pt.y-y,  SPRITES.Get('tile3', 0), 1, 0, 0.5); //shadow
            
            pt.Add(this.center);
            
            GFX.Sprite(pt.x-x, pt.y-y-this.z, this.Body, 1, 0, 1);
        }
    }

    Collider(perp){
    }
}

class Dood extends GameObjectBase {
    
    constructor(pos, type)
    {
        super(pos, type);   
    }

    Movement(dt, input){    
        var sp = this.speed *dt;  
        this.direction.v = input.up ? -1 : input.down ? 1 : 0;
        this.direction.h = input.left ? -1 : input.right ? 1 : 0;

        if(this.direction.v == 1){
            this.velocity.y += sp;
        }
        else if(this.direction.v == -1){
            this.velocity.y -= sp;
        }

        if(this.direction.h == 1){
            this.velocity.x += sp;
        }
        else if(this.direction.h == -1){
            this.velocity.x -= sp;
        }

    }

    Update(dt){
        if(this.enabled){
            if(!Util.CanMove(this.pos, this.bounds, this.velocity.x, 0, this.z) )
            {
               this.velocity.x=0;
            }
            if(!Util.CanMove(this.pos, this.bounds, 0, this.velocity.y, this.z) )
            {
                this.velocity.y=0;
            }

           this.pos.Add(this.velocity);

           // apply physics
           this.velocity.Multiply(this.damping);
       }

       super.Update(dt);
    }
}

class Drone extends GameObjectBase {
    
    constructor(pos, body, z=0)   
    {
        super(pos, C.ASSETS.PLAYER);
        this.body = body;
        this.enabled = 1;
        this.center = new Vector2(0,-9);
        this.z = z;
    }
}

class Player extends Dood {
    
    constructor(pos)
    {
        super(pos, C.ASSETS.PLAYER);
        this.speed=16;
        this.jump = 120;
        this.jump2 = 160;
        this.damping=0.9;
        this.bounds = {t:11,b:11,l:11,r:11};

        this.hits = [
            {r:8,pos:new Vector2(0,0)}
        ];
        this.center = new Vector2(-2,-14);
        this.body = "hero_0";
        this.z = 0;
        this.jumpV = 0;
        this.jumping = 0;

        this.face = [1,0,0,0];

        this.shadow = "shadow";
        this.zz = 0;
    }

    Update(dt){
        var d = {
            up:Input.Up(),
            down:Input.Down(),
            left:Input.Left(),
            right:Input.Right()
        };
        super.Movement(dt,d);

        if(Input.Fire1()){
            if(!this.jumping){
                this.jumpV=this.jump;
                this.jumping = 1;
            }
        }
        if(Input.Fire2()){
            if(!this.jumping){
                this.jumpV=this.jump2;
                this.jumping = 1;
            }
        }
        if(this.jumping ||this.z>0){
            this.zz = Util.Over(this.pos, this.bounds, this.z);

            this.z = Util.Clamp(this.z+(this.jumpV*dt), this.zz, 999);
            this.jumpV-= this.jumping ? GAME.gravity*dt : 0;
            this.jumping = this.z > this.zz;          
        }

        if(d.up){
            this.body = 'hero_0';
            if(d.left){
                this.body = 'hero_7';
            }
            if(d.right){
                this.body = 'hero_1';
            }
        }
        else if(d.down){
            this.body = 'hero_4';
            if(d.left){
                this.body = 'hero_5';
            }
            if(d.right){
                this.body = 'hero_3';
            }
        }
        else if(d.left){
            this.body = 'hero_6';
        }
        else if(d.right){
            this.body = 'hero_2';
        }
        super.Update(dt);

        DEBUG.Print("Z",this.z);
    }

    Render(x,y){
        if(this.enabled){
            var pt = Util.IsoPoint(this.pos.x, this.pos.y);
            GFX.Sprite(pt.x-x, pt.y-y-this.zz,  SPRITES.Get('shadow', 0), 1, 0, 1); //shadow
            
            super.Render(x, y);
        }
    }
}

class AI extends Dood {
    
    constructor(pos)
    {
        super(pos, C.ASSETS.ENEMY);
        this.speed=32;
        this.jump = 8;
        this.damping=0.9;
        this.bounds = {t:12,b:12,l:12,r:12};

        this.hits = [
            {r:8,pos:new Vector2(0,0)}
        ];
        this.center = new Vector2(0,-14);
        this.body = "hero";
        this.z = 0;
    }

    Update(dt){
        super.Update(dt);
    }
}

class Block extends GameObjectBase {
    
    constructor(pos, body, center, z=0)   
    {
        super(pos, C.ASSETS.BLOCK);
        this.body = body;
        this.enabled = 1;
        this.center = new Vector2(center.x, center.y);
        this.z = z;
    }
}
