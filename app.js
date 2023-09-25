//EVERYTHING WORKS!!!!!
class Slider{
    constructor(id,url){
        this.root = document.querySelector(`${id}`),
        this.url = url,
        this.current = 0,
        this.data,
        this.dataInterval = this.root.dataset.dataInterval,
        this.dataAnimationType = this.root.dataset.animationType,
        this.dataInfinite = this.root.dataset.infinite
    }
    showBtn=(btnRight,btnLeft)=>{
      if(this.dataInfinite === 'false'){
        if(current === 0){
          btnRight.style.display = 'block'
          btnLeft.style.display = 'none';
        }else if(current === this.data-1){
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
        // element.style.transition = 'all 1s ease'
      } 
    }
    updateBullets(ctx,current){
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
        btn.style.zIndex = '20';
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
    makeSlider(txt,app,index,previous,next,current){
      let element = document.createElement('div');
      element.setAttribute('class',txt);
      if(index === current){
        console.log('curr',current);
        element.style.left = '0'
      }else if(index === previous ){
        element.style.left = '-100%'
      }else if(index === next){
        element.style.left = '100%'
      }else{
        element.style.left = '100%'
      }
      app.appendChild(element)
      return element
    }
   
    setAutoplay=(ctx)=>{
      let current = 0;
      let interval = 2000 || this.dataInterval;
      let i = setInterval(() => {
        if(this.root.dataset.infinite === 'true'){
          if(current >= data.length){
            current = 0
            //rewind slider
          }
        }else if(this.root.dataset.infinite === 'false'){
            // console.log(this.root.dataset.infinite,'false');
          if(current >= data.length-1){
            console.log(current,data.length,'clear interval');
            clearInterval(i)
          }
        }
        this.updateBullets(ctx,current)
        this.checkAnimation(current);
          ctx.querySelector(`[data-set="${current}"]`).style.left = '0'
          current++;
      }, interval);
    }

    writeData(data){      

      let previous = data.length-1;//-100
      let current = 0;//0
      let next = current + 1;//100

      let dataInfinite = this.root.dataset.infinite//arrows always available
      // let dataAnimationType = this.root.dataset.animationType
      let dataBullets = this.root.dataset.bullets
      let dataAutoplay = this.root.dataset.autoplay//plays automatically if no data interval then fallback value ... if infinite true then infinite loop
      
        //make context
 
        let ctx = this.makeElements('ctx',this.root)

        let sliderItemWrapper = this.makeElements('slider-item-wrapper',ctx);
        
        let bulletWrapper = document.createElement('div');
        bulletWrapper.style.zIndex = '15';

        
        ///slider animation
        // interval
        dataAutoplay === 'true' ?
        this.setAutoplay(data,this.root.dataset.interval,ctx) : ''
        
        //bnt left
        let btnLeft = this.makeBtn('btn-left',"./assets/arrowback.svg",'left')
        sliderItemWrapper.appendChild(btnLeft)
        //btnn right
        let btnRight = this.makeBtn('btn-right',"./assets/arrowforward.svg",'right')
        sliderItemWrapper.appendChild(btnRight)
        
        
// BTN LEFT EVENT 
        btnLeft.addEventListener('click',(e)=>{
          this.current = this.current - 1;

          if(dataInfinite === 'false'){
            if(this.current === 0){
              this.current = this.data.length - 1
              next = 1
              previous = 0
            }else{
              this.current = this.current;
              next = this.current - 1
              previous = this.current + 1
              console.log('else',previous,this.current,next);
            }
          }else if(dataInfinite === 'true'){
            if(this.current < 0){
              this.current = this.data.length - 1
              next = this.data.length - 2 //1
              previous = 0
              console.log('cur < 0',previous,this.current,next);
              // console.log(this.current);
            }else if(this.current === 0){
              this.current = 0
              previous = this.current +1
              next = this.data.length - 1
            }
            else if(this.current > this.data.length -1){
              this.current = 0
              previous = this.current +1
              next = this.data.length - 1
            }
            else{
              this.current = this.current;
              next = this.current - 1
              previous = this.current + 1
              console.log('else',previous,this.current,next);
            }
          }
          // console.log(this.current);

          ctx.querySelectorAll('.slider').forEach((element,index)=>{
            if(index === previous){
              
               element.style.left = '100%'
               element.style.zIndex = '10'
               element.style.transition = 'left 1s ease'

              // element.style.transition = 'none'

            }else if (index === this.current){
              element.style.left = '0'
              element.style.zIndex = '12'
              element.style.transition = 'left 1s ease'

            }else if( index === next){
              element.style.left = '-100%'
              element.style.zIndex = '10'
              // element.style.transition = 'none'

            }else{
              element.style.zIndex = '5'
              element.style.transition = 'none'
            }
          })
          this.checkAnimation(this.current);
          this.showBtn(btnRight,btnLeft)
          this.updateBullets(ctx,this.current)        
        })

// BTN RIGHT EVENT LISTENER 
        btnRight.addEventListener('click',(e)=>{

          this.current = this.current+1
          if(dataInfinite === 'true'){           
            if(this.current === this.data.length - 1){
              this.current = this.data.length -1;
              previous = this.current - 1;
              next = 0
              //rewind slider
              // this.rewindSlider(this.current)//slider rewinding at the end of data.lenght instead doing it every click
            }else if(this.current > this.data.length -1){
              this.current = 0
              previous = this.data.length -1
              next = this.current +1
            }
            else {
              this.current = this.current;
              previous = this.current -1;
              next = this.current + 1;
            }
          }else if(dataInfinite === 'true'){
              this.current = this.current;
              previous = this.current -1;
              next = this.current + 1;
          }
     
          btnLeft.style.display = 'block'

            ctx.querySelectorAll('.slider').forEach((element,index)=>{
            if(index === previous){

              element.style.left = '-100%'
                
              element.style.zIndex = '10'
              element.style.transition = 'left 1s ease'


            }else if (index === this.current){
              element.style.left = '0'
              element.style.zIndex = '12'
              element.style.transition = 'left 1s ease'

            }else if( index === next){
              element.style.left = '100%'
              element.style.zIndex = '10'
            }else{
              element.style.zIndex = '5'
              element.style.transition = 'none'
            }
          })
          
            this.updateBullets(ctx,this.current);
            this.checkAnimation(this.current);
            this.showBtn(btnRight,btnLeft);


        })

      data.forEach((element,index) => {
                //one item slide

        let slider = this.makeSlider('slider',sliderItemWrapper,index,previous,next,current);

      
        slider.setAttribute('data-set',index);
        this.checkAnimation(this.current)

        slider.style.backgroundImage = `url(${data[index].img})`
        let title = this.makeElements('title',slider)
        title.innerHTML = data[index].title;
       
        
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
              // element.style.left = '1500px'
              this.dataAnimationType === 'fade' ?
              this.checkAnimation(element) : ''
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
        }
      )}

    init(){
      this.getData()
    }
}


const slider = new Slider('.root','http://localhost:3000/data')
slider.init()
