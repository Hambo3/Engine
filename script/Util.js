var ISO = 0.80;

var Util = {
    Collisions: function(bodies){
        for(var i=0, l=bodies.length; i<l; i++){  
            var body1 = bodies[i];            
            for(var j=i+1; j<l; j++){
                var body2 = bodies[j];

                var b1rects = body1.hits;

                for(var r=0; r<b1rects.length; r++){
                    var b2rects = body2.hits;
                    for(var t=0; t<b2rects.length; t++){

                        var p = body1.pos.Clone();
                        p.Add(b1rects[r].pos);

                        p.Subtract(body2.pos.Add(b2rects[t].pos));
                        var length = p.Length();
                        var target = b1rects[r].r + b2rects[t].r;
        
                        // if the spheres are closer
                        // then their radii combined
                        if(length < target){
                            var factor = (length-target)/length;
                            p.Multiply(factor*0.5);                            
                            
                            if(Util.CanMove(body1.pos, body1.bounds, -p.x, 0) )
                            {
                                 body1.pos.x -= p.x;
                                 body1.Collider(body2);
                            }
                            if(Util.CanMove(body1.pos, body1.bounds, 0, -p.y) )
                            {
                                body1.pos.y -= p.y;
                                body1.Collider(body2);
                            }

                            if(Util.CanMove(body2.pos, body2.bounds, p.x, 0) )
                            {
                                body2.pos.x += p.x;
                                body2.Collider(body1);
                            }
                            if(Util.CanMove(body2.pos, body2.bounds, 0, p.y) )
                            {
                                body2.pos.y += p.y;
                                body2.Collider(body1);
                            }        
                        }                        
                    }
                }
            }
        }
    },
    RectHit: function (prot, perp){ //if 2 rects overlap
        var p1x = prot.pos.x - (prot.width/2);
        var p1y = prot.pos.y - (prot.length/2);
        var p2x = perp.pos.x - (perp.width/2);
        var p2y = perp.pos.y - (perp.length/2);

        if (p1x < p2x + perp.width && p1x + prot.width > p2x &&
            p1y < p2y + perp.length && prot.length + p1y > p2y)
            {
                return new Vector2(p1x-p2x, p1y-p2y);
            }
            else{
                return 0;
            }
    }, 
    Over: function(p, b, z=0)
    {
        var tz = [
            MAP.Content( new Vector2(p.x - b.l, p.y - b.t)),
            MAP.Content( new Vector2(p.x + b.r, p.y - b.t)),
            MAP.Content( new Vector2(p.x + b.l, p.y + b.b)),
            MAP.Content( new Vector2(p.x - b.r, p.y + b.b)),
        ];

        var h=0;
        for(var i = 0; i < tz.length; i++) {
            var t = TILES[tz[i]][TILES[tz[i]].length-1];
            if(t.z+t.ht>h)
            {
                h=t.z+t.ht;
            }
        }
        
        return h;
    },
    CanMove: function(p, b, vx, vy, z=0){
        var i = parseInt(z/32);
        var clx = ROOFTOPS[i];
        //var clx = z<16 ? [1,2,3,4,5,6,7,8,9,10,11,12,13,14] : z<32 ? [1,2,3,4,5,6,7,8,9,10,11,12,13,14] : z<64 ? [1,2,3,6]:[1,2,3];
        //var clx = z<32 ? [1,2,3,4] : [1,2,3];
        if(clx.includes(MAP.Content( new Vector2(p.x - b.l + vx, p.y - b.t + vy)))) {//t left
            return false;
        }
        if(clx.includes(MAP.Content( new Vector2(p.x + b.r + vx, p.y - b.t + vy)))) {//t right
            return false;
        }
        if(clx.includes(MAP.Content( new Vector2(p.x - b.l + vx, p.y + b.b + vy)))) {//b left
            return false;
        }
        if(clx.includes(MAP.Content( new Vector2(p.x + b.r + vx, p.y + b.b +vy)))) {//b right
            return false;
        }
        return true;
    },
    OneIn: function(c){
        return Util.RndI(0,c)==0;
    },
    OneOf: function(arr){
        return arr[Util.RndI(0,arr.length)];
    },
    IntNormalise: function(n,r){
        return (r+1)-n;
    },
    //int min to max-1
    RndI: function (min, max){
        return parseInt(Math.random() * (max-min)) + min;
    },
    Rnd: function (max){
        return Math.random() * max;
    },  
    Min: function(a, b)
    {
        return (a<b)? a : b;
    },
    Max: function(a, b){
        return (a>b)? a : b;
    },
    Clamp: function(v, min, max){        
        return Util.Min(Util.Max(v, min), max);
    },
    Lerp: function(start, end, amt)
    {
        return (end-start) * amt+start;
    },
    AbsDist: function(p1, p2){
        return Math.abs( p1 - p2);
    },
    Context: function(w, h){
        var canvas = document.createElement('canvas');
        canvas.width = w;
		canvas.height = h;
        return {ctx:canvas.getContext('2d'), canvas:canvas};
    },
    xAngleToTarget: function(prot, perp) {
        var angle = Math.atan2(perp.x - prot.x, perp.y - prot.y);
        angle = angle * 360 / (2*Math.PI);
        if(angle < 0) {
            angle += 360;
        }
        return angle;
    }, 
    AngleToTarget: function(prot, perp) {
        var rad = new Vector2(perp.x - prot.x, perp.y - prot.y);
        return rad.Angle();
    }, 
    PointAngle: function(radius, angle){
        var r = Util.Radians(angle);
        return {x: Math.sin(r) * radius,
                y: Math.cos(r) * radius};
    },
    // Converts from degrees to radians.
    Radians: function(degrees) {
        return degrees * Math.PI / 180;
    },    
    // Converts from radians to degrees.
    Degrees: function(radians) {
        return radians * 180 / Math.PI;
    }, 
    IsoPoint: function(x, y)
    {
        return new Vector2((x - (y * (1-ISO)))+(6*32), ((y + (x * (1-ISO)))*ISO)+(0*32));
    }
}

// a v simple object pooler
var ObjectPool = function () {
    var list = [];

    return {
        Is: function(type){
            for (var i = 0; i < list.length; i++) {
                if (list[i].enabled == false && list[i].type == type)
                {
                    return list[i];
                }
            }
            return null;
        },
        Add: function(obj){
            list.push(obj);         
        },
        Get: function(type, not){
            if(type){
                if(not){
                    return list.filter(l => l.enabled && type.indexOf(l.type) == -1);
                }else{
                    return list.filter(l => l.enabled && type.indexOf(l.type) != -1);
                }
            }else{
                return list.filter(l => l.enabled);
            }
        },
        Sorted: function(pred){
            var l = list.filter(pred);
            l.sort(function(a, b){
                var ang = Util.AngleToTarget(b.pos, a.pos);
                return ang > -0.78 && ang<2.35 ? 1 : -1;
            });
            return l;
        },
        Count: function(all, type){
            if(type){
                return (all) ? list.filter(l => type.indexOf(l.type) != -1).length : list.filter(l => l.enabled && type.indexOf(l.type) != -1).length;
            }
            else{
                return (all) ? list.length : list.filter(l => l.enabled).length;
            }
        }      
    }
};

