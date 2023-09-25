//EVERYTHING WORKS!!!!!
import { MyData,SlideData } from "./types";
class Slider{
    root:any;
    url:any;
    current:any;
    data: SlideData[];
    dataInterval:any;
    dataAnimationType:any;
    dataInfinite:any;

    constructor(id:any,url:any){
        this.root = document.querySelector(`${id}`),
        this.url = url,
        this.current = 0,
        this.data,
        this.dataInterval = this.root.dataset.dataInterval,
        this.dataAnimationType = this.root.dataset.animationType,
        this.dataInfinite = this.root.dataset.infinite
    }
    checkStorage(){
      let temp = JSON.parse(localStorage.getItem('current')!);
      this.current = temp;
      let arr = document.querySelectorAll('.slider') as NodeListOf<HTMLDivElement>
      let previous = this.current - 1;
      let next = this.current + 1;
      this.positionSlides(arr,previous,next,'right')
      // this.updateBullets(ctx);
      // this.showBtn(btnLeft,btnRight)
    }
    positionSlides = (arr,previous: number,next: number,direction: string)=>{
      arr.forEach((element,index)=>{
      if(index === previous){ 
              element.style.left =  direction === 'left' ? `100%` : `-100%`;
              element.style.zIndex = '10';

          }else if (index === this.current){
              element.style.left = '0';
              element.style.zIndex = '12';

          }else if( index === next){
              element.style.left =  direction === 'left' ? `-100%` : `100%`;
              element.style.zIndex = '10';

          }else{
                element.style.zIndex = '5';
          }
          this.checkAnimation()
      })
    }
    showBtn = (btnRight: HTMLButtonElement,btnLeft: HTMLButtonElement)=>{

      if(this.dataInfinite === 'false'){
        if(this.current === 0){
          btnRight.style.display = 'block';
          btnLeft.style.display = 'none';
        }else if(this.current === this.data.length-1){
          btnRight.style.display = 'none';
          btnLeft.style.display = 'block';
        }else{
          btnRight.style.display = 'block';
          btnLeft.style.display = 'block';
        }
      }
    }
    checkInfinite = (btn: HTMLButtonElement,placed: string) => {///checks if arrows should be shown
      if(this.current === 0 && this.root.dataset.infinite === 'false' && placed === 'left'){
        btn.style.display = 'none';
        }else if(this.current === this.data.length && this.root.dataset.infinite === 'false' && placed === 'right'){
          btn.style.display = 'none';
        }else{
          btn.style.display = 'block';
        }
      }
    checkAnimation = () => {

      let element = document.querySelector(`[data-set="${this.current}"]`) as HTMLDivElement;
      if(this.dataAnimationType === 'fade'){
        let opacity = 0;
        let fadeIn = setInterval(() => {
          if (opacity >= 1) {
              clearInterval(fadeIn);
          }

          element.style.opacity = `${opacity}`;
          opacity += 0.01;
        }, 10);
      }else if(this.dataAnimationType === 'scroll'){
        element.style.transition = 'all 1s ease'
      } 
    }
    updateBullets(ctx: HTMLDivElement){
      ctx.querySelectorAll('button').forEach((element)=>{
        if((this.current) === Number(element.dataset.set)){
          element.setAttribute('class','bullets-clicked')
          }else{
          element.classList.remove('bullets-clicked')
          }
        })
    }
    makeBtn(id: string,img: string,placed: string){///makes arrow btn
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
            btn.style.left = '0';
            this.checkInfinite(btn,'left');//infinite
          }else{
            btn.style.right = '0';
            this.checkInfinite(btn,'right');//infinite
          }
        return btn
    }

    makeElements(txt: string,app: HTMLDivElement){
      let element = document.createElement('div');
      element.setAttribute('class',txt);
      app.appendChild(element);
      return element;
    }
    makeSlider(txt: string,app : HTMLDivElement,index: number,previous: number,next: number,current: number){
      let element = document.createElement('div');
      element.setAttribute('class',txt);
      if(index === current){
        console.log('curr',current);
        element.style.left = '0';
      }else if(index === previous ){
        element.style.left = '-100%';
      }else if(index === next){
        element.style.left = '100%';
      }else{
        element.style.left = '100%';
      }
      app.appendChild(element);
      return element;
    }
   
    setAutoplay = (ctx: HTMLDivElement,btnLeft: HTMLButtonElement,btnRight: HTMLButtonElement)=>{
      let previous;
      let next;
      let interval = 2000 || this.dataInterval;
      let i = setInterval(() => {
        if(this.root.dataset.infinite === 'true'){
           if(this.current === this.data.length - 1){
              this.current = this.data.length -1;
              previous = this.current - 1;
              next = 0
            }else if(this.current > this.data.length -1){
              this.current = 0;
              previous = this.data.length -1;
              next = this.current +1;
            }
            else {
              this.current = this.current;
              previous = this.current -1;
              next = this.current + 1;
            }
        }else if(this.root.dataset.infinite === 'false'){
            this.current = this.current;
            previous = this.current -1;
            next = this.current + 1;
          if(this.current >= this.data.length-1){
            clearInterval(i);
          }
        }
        this.updateBullets(ctx);
        this.showBtn(btnRight,btnLeft)
        this.checkAnimation();
        let arr = ctx.querySelectorAll('.slider') as NodeListOf<HTMLDivElement>
        this.positionSlides(arr,previous,next,'right');
        this.current++;
      }, interval);
    }

    writeData(data: Array<SlideData>){      

      let previous = data.length-1;//-100
      let current = 0;//0
      let next = current + 1;//100
    
      let dataInfinite = this.root.dataset.infinite;//arrows always available
      // let dataAnimationType = this.root.dataset.animationType
      let dataBullets = this.root.dataset.bullets;
      let dataAutoplay = this.root.dataset.autoplay;//plays automatically if no data interval then fallback value ... if infinite true then infinite loop
      
        //make context
 
      let ctx = this.makeElements('ctx',this.root);

      let sliderItemWrapper = this.makeElements('slider-item-wrapper',ctx);
        
      let bulletWrapper = document.createElement('div');
      bulletWrapper.style.zIndex = '15';
        
        //bnt left
      let btnLeft = this.makeBtn('btn-left',"./assets/arrowback.svg",'left');
      sliderItemWrapper.appendChild(btnLeft);
        //btnn right
      let btnRight = this.makeBtn('btn-right',"./assets/arrowforward.svg",'right');
      sliderItemWrapper.appendChild(btnRight);
      this.showBtn(btnRight,btnLeft);
        
        ///slider animation
        // interval
      dataAutoplay === 'true' ?
      this.setAutoplay(ctx,btnLeft,btnRight) : ''

      // localStorage.getItem('current') ? this.checkStorage() : ''
        
// BTN LEFT EVENT 
      btnLeft.addEventListener('click',(e)=>{
          this.current = this.current - 1;

          if(dataInfinite === 'false'){
            if(this.current === 0){
              this.current = 0;
              next = this.current - 1;
              previous = this.current + 1;
            }else{
              this.current = this.current;
              next = this.current - 1;
              previous = this.current + 1;
            }
          }else if(dataInfinite === 'true'){
            if(this.current < 0){
              this.current = this.data.length - 1;
              next = this.data.length - 2;//1
              previous = 0;
              // console.log(this.current);
            }else if(this.current === 0){
              this.current = 0;
              previous = this.current +1;
              next = this.data.length - 1;
            }
            else if(this.current > this.data.length -1){
              this.current = 0;
              previous = this.current +1;
              next = this.data.length - 1;
            }
            else{
              this.current = this.current;
              next = this.current - 1;
              previous = this.current + 1;
            }
          }
          // console.log(this.current);
        let arr = ctx.querySelectorAll('.slider') as NodeListOf<HTMLDivElement>
  
        this.positionSlides(arr,previous,next,'left');
        this.checkAnimation();
        this.showBtn(btnRight,btnLeft);
        this.updateBullets(ctx);      
    })


// BTN RIGHT EVENT LISTENER 
      btnRight.addEventListener('click',(e)=>{

          this.current = this.current+1

          if(dataInfinite === 'true'){           
            if(this.current === this.data.length - 1){
              this.current = this.data.length -1;
              previous = this.current - 1;
              next = 0
            }else if(this.current > this.data.length -1){
              this.current = 0;
              previous = this.data.length -1;
              next = this.current +1;
            }
            else {
              this.current = this.current;
              previous = this.current -1;
              next = this.current + 1;
            }
          }else if(dataInfinite === 'false'){
              this.current = this.current;
              previous = this.current -1;
              next = this.current + 1;
          }
     
            let arr = ctx.querySelectorAll('.slider') as NodeListOf<HTMLDivElement>

            this.positionSlides(arr,previous,next,'right');
            this.updateBullets(ctx);
            this.checkAnimation();
            this.showBtn(btnRight,btnLeft);
      })

        data.forEach((element: SlideData,index) => {
                //one item slide

        let slider = this.makeSlider('slider',sliderItemWrapper,index,previous,next,current);

      
        slider.setAttribute('data-set',`${index}`);
        this.checkAnimation()

        slider.style.backgroundImage = `url(${data[index].img})`
        let title = this.makeElements('title',slider)
        title.innerHTML = data[index].title;
       
        
        //explore link\
        let exploreLink = document.createElement('a');
        exploreLink.setAttribute('class','explore_link');
        exploreLink.innerHTML = `<span>${data[index].buttonText}</span>`;
        exploreLink.href = data[index].buttonLink;
        slider.appendChild(exploreLink);

        //check if bullet is true
        dataBullets==='true' ?
        sliderItemWrapper.append(bulletWrapper) : ''
        

        bulletWrapper.setAttribute('class','bullet-wrapper');


        let bullet = document.createElement('button');
        bullet.setAttribute('data-set',`${index}`);
        bullet.setAttribute('class','bullets');
        bulletWrapper.appendChild(bullet)
        index===0 ? bullet.setAttribute('class','bullets-clicked') : ''

        bullet.addEventListener('click',(e)=>{
          
          this.current = Number(bullet.dataset.set);
          this.showBtn(btnRight,btnLeft);

          let arr = ctx.querySelectorAll('.slider') as NodeListOf<HTMLButtonElement>
          let previous = this.current - 1;
          let next = this.current + 1;
          this.positionSlides(arr,previous,next,'right')

          let targetBullet = e.target as HTMLButtonElement;
          targetBullet?.classList.add('bullets-clicked');
          this.checkAnimation();
          //update bullets
          ctx.querySelectorAll('.bullets-clicked').forEach(element=>{
            if(e.target !== element){
              element.classList.remove('bullets-clicked');
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
      )
    }

    init(){
      this.getData();
       //save into local storage
        
      window.addEventListener("unload", (e) => {
        console.log(this.current,'frome event');
        localStorage.setItem('current', JSON.stringify(this.current));
      });
    }
}


const slider: MyData = new Slider('.root','http://localhost:3000/data')
slider.init()
