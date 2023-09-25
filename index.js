
//everything but slider infinite scroll works
class Slider{
    constructor(id,url){
        this.root = document.querySelector(`${id}`),
        this.url = url,
        this.current = 0,
        this.dataInterval = this.root.dataset.dataInterval,
        this.dataAnimationType = this.root.dataset.animationType,
        this.dataInfinite = this.root.dataset.infinite,
        this.data
    }
    showBtn=(btnRight,btnLeft)=>{
      if(this.dataInfinite === 'false'){
        if(this.current === 0){
          console.log('curr',0,'=',this.current);
          btnRight.style.display = 'block'
          btnLeft.style.display = 'none';
        }else if(this.current === this.data.length-1){
          console.log('curr',4);
          btnRight.style.display = 'none';
          btnLeft.style.display = 'block';
        }
      }
    }
    
    checkInfinite = (btn,placed) => {///checks if arrows should be shown
      if(this.current === 0 && this.root.dataset.infinite === 'false' && placed === 'left'){
        btn.style.display = 'none'
        }else if(this.current === this.data.length && this.root.dataset.infinite === 'false' && placed === 'right'){
          btn.style.display = 'none'
        }else{
          btn.style.display = 'block'
        }
      }
    checkAnimation = (current) => {
      let element = document.querySelector(`[data-set="${current}"]`);
      if(this.dataAnimationType === 'fade'){
        let opacity = 0;
        let fadeIn = setInterval(() => {
          if (opacity >= 1) {
              clearInterval(fadeIn);
          }
          element.style.opacity = opacity;
          opacity += 0.01;
        }, 10);
      }else if(this.dataAnimationType === 'scroll'){
        element.style.transition = 'all 2s ease'
      } 
    }
    updateBullets(ctx,current){
      current = current || this.current
      console.log(current);
      ctx.querySelectorAll('button').forEach((element)=>{
        if((current) === Number(element.dataset.set)){
          element.setAttribute('class','bullets-clicked')
          }else{
          element.removeAttribute('class','bullets-clicked')
          }
        })
    }
    makeBtn(id,img,placed){///makes arrow btn
        let btn = document.createElement('button');
        btn.setAttribute('class',id);
        let btnImg = document.createElement('img');
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        btn.style.zIndex = '2';
        //
        btnImg.src = img
        btn.appendChild(btnImg)
          if(placed === 'left'){
            btn.style.left = '0'
            this.checkInfinite(btn,'left')//infinite
          }else{
            btn.style.right = '0'
            this.checkInfinite(btn,'right')//infinite
          }
        return btn
    }

    makeElements(txt,app){
      let element = document.createElement('div');
      element.setAttribute('class',txt);
      app.appendChild(element)
      return element
    }
    rewindSlider(current,ctx){
      // current = current || this.current 
      ctx.querySelectorAll('.slider').forEach(element=>{ ///new aproach just movingg 1500px left when starting from start.update bullets and left btn
        if(current === Number(element.dataset.set)){
          element.style.left='0'
        }else{
          element.style.left = '100%'
        }
      })
    }
    setAutoplay=(ctx)=>{
      let current = 0;
      let interval = 2000 || this.dataInterval;
      let i = setInterval(() => {
        // document.querySelector(`[data-set="${current}"]`).style.left = '1500px'
        if(this.root.dataset.infinite === 'true'){
          if(current >= this.data.length){
            // console.log('true',current,this.data.length-1);
            current = 0
            //rewind slider
            this.rewindSlider(current,ctx)
          }
        }else if(this.root.dataset.infinite === 'false'){
            // console.log(this.root.dataset.infinite,'false');
          if(current >= this.data.length-1){
            console.log(current,this.data.length,'clear interval');
            clearInterval(i)
          }
        }
        this.updateBullets(ctx,current);
        this.checkAnimation(current);
          ctx.querySelector(`[data-set="${current}"]`).style.left = '0'
          // document.querySelector(`[data-set="${current}"]`).style.transition = 'all 1s ease';
          current++;
      }, interval);
    }
    checkStorage(){
      let temp = JSON.parse(localStorage.getItem('current')) 
      document.querySelector(`[data-set="${temp}"]`).style.left = '0' 
      this.current = temp
      this.updateBullets(document,this.current)
    }
    writeData(data){
    
      let dataInfinite = this.root.dataset.infinite//arrows always available
      // let dataAnimationType = this.root.dataset.animationType
      let dataBullets = this.root.dataset.bullets
      let dataAutoplay = this.root.dataset.autoplay//plays automatically if no data interval then fallback value ... if infinite true then infinite loop
      console.log(this.current,'current');
     
        //make context
 
        let ctx = this.makeElements('ctx',this.root);

         //save into local storage
        window.addEventListener("unload", (e) => {
          console.log(this.current,'frome event');
          localStorage.setItem('current', JSON.stringify(this.current));
        });

        let sliderItemWrapper = this.makeElements('slider-item-wrapper',ctx);
        
        let bulletWrapper = document.createElement('div');
        bulletWrapper.style.zIndex = '2';

        
        ///slider animation
        // interval
        dataAutoplay === 'true' ?
        this.setAutoplay(ctx) : ''
        
        //bnt left
        let btnLeft = this.makeBtn('btn-left',"./assets/arrowback.svg",'left')
        sliderItemWrapper.appendChild(btnLeft)
        //btnn right
        let btnRight = this.makeBtn('btn-right',"./assets/arrowforward.svg",'right')
        sliderItemWrapper.appendChild(btnRight)
        
        
        //add event left
        btnLeft.addEventListener('click',(e)=>{
          this.current = this.current - 1;
          if(dataInfinite === 'false'){
            if(this.current === 0){
                btnLeft.style.display = 'none'
            }
          }else if(dataInfinite === 'true'){
            // console.log(this.current);
            if(this.current < 0){
              this.current = this.data.length - 1
              // console.log(this.current);
            }else{
              this.current = this.current;
              ctx.querySelector(`[data-set="${this.current+1}"]`).style.left = '100%'
            }
            ctx.querySelector(`[data-set="${this.current}"]`).style.left = '0'
          }
          this.checkAnimation(this.current)
              // ctx.querySelector(`[data-set="${current+1}"]`).style.left = '100%'
          ctx.querySelector(`[data-set="${this.current}"]`).style.left = '0'

          
          btnRight.style.display = 'block'  
           // update bullets

          this.updateBullets(ctx,this.current)
        // document.querySelector(`[data-set="${current+1}"]`).style.left = '1500px'
        
        })

        //add event right
        btnRight.addEventListener('click',(e)=>{
          // document.querySelector(`[data-set="${current}"]`).style.left = '1500px' //turned off so slider rewind could work

          this.current = this.current+1
          if(dataInfinite === 'false'){//check infinite data 
              if(this.current === this.data.length-1){
                this.current = 0
                btnRight.style.display = 'none'
              }
          }else if(dataInfinite === 'true'){           
              if(this.current >= this.data.length ){
              this.current = 0;
              //rewind slider
              this.rewindSlider(this.current,ctx)//slider rewinding at the end of data.lenght instead doing it every click
            }else{
              // document.querySelector(`[data-set="${current}"]`).style.left = '0';
              // document.querySelector(`[data-set="${current - 1}"]`).style.left = '-100%';
            }
          }
           ctx.querySelector(`[data-set="${this.current}"]`).style.left = '0';
            // document.querySelector(`[data-set="${current - 1}"]`).style.left = '-100%';
            btnLeft.style.display = 'block'
          
            this.updateBullets(ctx)
      
            this.checkAnimation(this.current) 

        })


      data.forEach((element,index) => {

     
        this.current = 0
        

                //one item slide
        let slider = this.makeElements('slider',sliderItemWrapper);
        this.dataAnimationType === 'scroll' ?
        slider.classList.add('slider-scroll') : ''
        
        slider.setAttribute('data-set',index);
        this.checkAnimation(this.current)

        slider.style.backgroundImage = `url(${data[index].img})`
        let title = this.makeElements('title',slider)
        title.innerHTML = data[index].title;
        slider.style.left = '100%'
        ctx.querySelector(`[data-set="${this.current}"]`).style.left = '0'
       
        
        //explore link\
        let exploreLink = document.createElement('a');
        exploreLink.setAttribute('class','explore_link');
        exploreLink.innerHTML = `<span>${data[index].buttonText}</span>`;
        exploreLink.href = data[index].buttonLink;
        slider.appendChild(exploreLink)
        //check if bullet is true
        dataBullets==='true' ?
        sliderItemWrapper.append(bulletWrapper) : ''
        

        bulletWrapper.setAttribute('class','bullet-wrapper');


        let bullet = document.createElement('button');
        bullet.setAttribute('data-set',index);
        bullet.setAttribute('class','bullets');
        bulletWrapper.appendChild(bullet)
        index===0 ? bullet.setAttribute('class','bullets-clicked') : ''

        bullet.addEventListener('click',(e)=>{

          this.current = Number(bullet.dataset.set);
          this.showBtn(btnRight,btnLeft)

          ctx.querySelectorAll(`.slider`).forEach(element=>{
            if(this.current !== Number(element.dataset.set)){
              element.style.left = '100%'
              // this.dataAnimationType === 'fade' ?
              // this.checkAnimation(element) : ''
            }else{
              element.style.left = '0'

            }
          })
          e.target.classList.add('bullets-clicked')
          this.checkAnimation(this.current) 
          //updat4e bullets
          ctx.querySelectorAll('.bullets-clicked').forEach(element=>{
            if(e.target !== element){
              element.removeAttribute('class','bullets-clicked')
            }
          })
        })
      }); 
    }
    getData(){
      fetch(`${this.url}`)
      .then(data=>data.json())
      .then(data=>{
        this.data = data;
        this.writeData(data);
        localStorage.getItem('current') ? this.checkStorage() : ''
      })
    }
    init(){
      this.getData()
    }
}


const slider = new Slider('.root','http://localhost:3000/data')
slider.init()
// const slider1 = new Slider('.root','http://localhost:3000/data')
// slider1.init()
