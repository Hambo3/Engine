class SpritePreProcessor{

    constructor(source, definition, onReady){
        this.onReady = onReady;
        this.assets = [];
        this.spriteData = definition;
        this.Init(source);
    }

    Get(tag,frame=0, asset){
        var s = this.spriteData[tag];
        return {
            img: asset || this.assets[s.tag],
            pos:s.src[frame],
            dim:{w:s.w,h:s.h}
        };
    }

    Clone(tag, recol){
        if(recol){
            return GfxUtil.HSLReplace(this.assets[tag], recol);
        }
        else{
            return this.assets[tag];
        }
    }

    Init(spriteSource) {
        var sprites = spriteSource.filter(s => s.src);
        var numAssets = sprites.length;
        var t = this;
        sprites.forEach(function(sheet) 
        {
            var a = new Image();   

            a.src = sheet.src;
            var tag = sheet.tag;
            a.onload = function() { 
                t.assets[tag] = a;

                if(--numAssets == 0)
                {
                    t.PostProcessing(spriteSource);
                }
            };
        });
    }

    PostProcessing(spriteSource){
        var sprites = spriteSource.filter(s => s.ref);
        var t = this;
        sprites.forEach(function(sheet) 
        {
            if(sheet.recol)
            {
                t.assets[sheet.tag] = GfxUtil.HSLReplace(t.assets[sheet.ref], sheet.recol);
            }
        });   

        if(this.onReady){
            this.onReady();				
        }
    }
}

class MapManger{

    constructor(ctx, md){
        this.mapData = md.data;

        this.offset = new Vector2();
        this.planSize = new Vector2(md.size.world.width, md.size.world.height);
        this.mapSize = new Vector2(md.size.world.width, md.size.world.height);
        this.mapSize.Multiply(md.size.tile.width);
        this.screenSize = new Vector2(md.size.screen.width, md.size.screen.height);
        this.screenSize.Multiply(md.size.tile.width);
        this.area = new Vector2(md.size.area.width, md.size.area.height);
        this.bounds = new Vector2(this.mapSize.x,this.mapSize.y);

        this.tileSize = md.size.tile.width;
        this.scale = 1;
        this.maxScale = 1;
        this.minScale = 0.3;

        this.screenCtx = ctx;
        this.screenCtx.imageSmoothingEnabled = true;

        this.tileCanvas = Util.Context(this.mapSize.x, this.mapSize.y);
        this.osCanvas = Util.Context(this.mapSize.x, this.mapSize.y);

        this.tileset = [assets.square, assets.square, assets.square];
        this.rend = new Render(this.tileCanvas.ctx);

        this.SetScale();
    }

    Init(){
        var p;
        var col = this.area.x;
        var row = this.area.y;
        var h = this.tileSize/2;

        this.rend.Box(0,0,this.mapSize.x,this.mapSize.y,'#777');

        for(var r = 0; r < row; r++) 
        {
            for(var c = 0; c < col; c++) 
            {
                p = this.mapData[r][c];                
                var pt = Util.IsoPoint((c * this.tileSize)+h, (r * this.tileSize)+h); 
                var s = SPRITES.Get("tile"+p, 0);
                this.rend.Sprite(pt.x, pt.y, s, 1, 0, 1);
             }
        }
    }

    Row(pos){
        return parseInt(pos.y/this.tileSize);
    }

    get Pos(){
        return {t:this.offset.y-32,
            b:this.offset.y+(this.screenSize.y*this.scale)+32,
            l:this.offset.x-32, 
            r:this.offset.x+(this.screenSize.x*this.scale)+32,
            m:this.offset.x+((this.screenSize.x*this.scale)/2)};
    }
    
    SetScale(){
        if(this.mapSize.y > this.mapSize.x){
			this.maxScale = this.mapSize.x/this.screenSize.x;
		}
		else{
			this.maxScale = this.mapSize.y/this.screenSize.y;
		}
    }

    Zoom(rate){
        this.scale = Util.Clamp(this.scale+rate, this.minScale, this.maxScale);
    }

    MaxZoom(){
        this.scale = this.maxScale;
    }

    MinZoom(){
        this.scale = this.minScale;
    }

    ScrollTo(target, lerp){
        var pt = Util.IsoPoint(target.x, target.y);
        var sc = this.screenSize.Clone();
        var bn = this.bounds.Clone();
        sc.Multiply(this.scale);
        
        var destx = pt.x - (sc.x/2);
        var desty = pt.y - (sc.y/2);

        if(lerp)
        {
            destx = Util.Lerp(this.offset.x, pt.x - (sc.x/2), lerp);
            desty = Util.Lerp(this.offset.y, pt.y - (sc.y/2), lerp);
        }

        if(destx < 0){
            destx = 0;
        }
        if(destx > bn.x - (sc.x)){
            destx = bn.x - (sc.x);
        }

        if(desty < 0){
            desty = 0;
        }
        if(desty > bn.y - (sc.y)){
            desty = bn.y - (sc.y);
        }

        this.offset.x = destx;
        this.offset.y = desty;

        return this.offset;
    }

    ScreenBounds(){
        var sc = this.screenSize.Clone();
        sc.Multiply(this.scale);
        sc.Add(this.offset);
        return {Min:this.offset, Max:sc};
    }

    PreRender(){
        var sc = this.screenSize.Clone();
        sc.Multiply(this.scale);

        this.osCanvas.ctx.drawImage
        (
            this.tileCanvas.canvas, 
            this.offset.x, this.offset.y, sc.x, sc.y,
            0, 0, sc.x, sc.y
        );

        if(this.hasOverlay){
            this.osCanvasOverlay.ctx.clearRect(0, 0, this.mapSize.x, this.mapSize.y);
            this.osCanvasOverlay.ctx.drawImage
            (
                this.overlayCanvas.canvas, 
                this.offset.x, this.offset.y, sc.x, sc.y,
                0, 0, sc.x, sc.y
            );
        }

        return this.offset;
    }
    
    PostRender(){
        var sc = this.screenSize.Clone();
        sc.Multiply(this.scale);

        this.screenCtx.drawImage
        (
            this.osCanvas.canvas, 
            0, 0, sc.x, sc.y,
            0, 0, this.screenSize.x, this.screenSize.y
        );
        if(this.hasOverlay){
            this.screenCtx.drawImage
            (
                this.osCanvasOverlay.canvas, 
                0, 0, sc.x, sc.y,
                0, 0, this.screenSize.x, this.screenSize.y
            );
        }
    }

    ImageRender(x,y,w,h){
        var sc = this.screenSize.Clone();
        sc.Multiply(this.scale);

        this.screenCtx.drawImage
        (
            this.osCanvas.canvas, 
            0, 0, sc.x, sc.y,
            x, y, w,h
        );
    }

    Content(pos){
        var c = Math.floor(pos.x / this.tileSize);
        var r = Math.floor(pos.y / this.tileSize);
        return this.mapData[r][c];
    } 
}

class Render{

    constructor(context, width, height)
    {
        this.ctx = context;
        this.bounds = {w:width,h:height};
    }

    PT(p){
        return Math.round(p);
    }

    Sprite(x, y, sprite, scale, angle=0, op){
        var dim = sprite.dim;   

        this.ctx.save();
        this.ctx.translate(this.PT(x), this.PT(y));
        this.ctx.rotate( Util.Radians(angle));  
        if(sprite.pos.m){
            this.ctx.scale(-1,1);
        }

        if(op){
            this.ctx.globalAlpha = op;
        }

        this.ctx.drawImage(sprite.img, sprite.pos.x, sprite.pos.y, dim.w, dim.h,
            -((dim.w* scale)/2), -((dim.h* scale)/2), dim.w * scale, dim.h * scale);
        this.ctx.restore();
    }
        
    PolySprite(x, y, poly, coli, size)
    {
        for(var i = 0; i < poly.length; i+=2) 
        {
            this.Plane(x, y, poly[i+1], PAL[ coli||0 ], size);
        } 
    }

    Plane(x, y, pts, col, sz)
    {
        this.ctx.fillStyle = col;
        this.ctx.beginPath();
        var pt = Util.IsoPoint(pts[0]*sz, pts[1]*sz);
        this.ctx.moveTo(
            this.PT(pt.x  + x), 
            this.PT(pt.y + y)
            );

        for(var p = 2; p < pts.length; p+=2) {
            pt = Util.IsoPoint(pts[p]*sz, pts[p+1]*sz);
            this.ctx.lineTo(
                this.PT(pt.x + x), 
                this.PT(pt.y + y)
                ); 
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    Image(img, pos, size, src, clip){
        this.ctx.drawImage
        (
            img, 
            src.x, src.y, clip.x, clip.y,
            pos.x, pos.y, size.x, size.y
        );
    }

    Clear(){
        this.ctx.clearRect(0, 0, this.bounds.w, this.bounds.h);
    }
    Box(x,y,w,h,c){
        this.ctx.fillStyle = c || '#000000';
        this.ctx.fillRect(x, y, w, h);
    }

    Circle(x,y,r,c){
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = c;
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        this.ctx.stroke();
    }

    Text(str, xs, ys, size, sc, col) {

        ctx.fillStyle = col || '#000000';
        var cr = xs;

        for (var i = 0; i < str.length; i++) {
            var xp = 0;
            var yp = 0;
            var mx = 0; 

            var chr = str.charAt(i);                     
            if(chr == '+')
            {
                ys += (size*8);
                xs=cr;
            }
            else
            {
                var l = FONT[str.charAt(i)];

                for (var r = 0; r < l.length; r++) 
                {                
                    xp = 0;
                    var row = l[r];
                    for (var c = 0; c < row.length; c++) 
                    {                    
                        var szx = (sc && c==row.length-1) ? size*2 : size;
                        var szy = (sc && r==l.length-1) ? size*2 : size;
                        if (row[c]) {
                            this.ctx.fillRect(Math.round(xp + xs), Math.round(yp + ys), szx, szy);
                        }
                        xp += szx;
                    }
                    mx = xp>mx ? xp : mx;
                    yp += szy;
                }
                xs += mx + size; 
            }
        }
    } 
}
