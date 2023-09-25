///everything but scroll works

class Slider{
    constructor(id,url){
        this.root = document.querySelector(`${id}`),
        this.url = url,
        this.dataAutoplay = this.root.dataset.autoplay,//plays automatically if no data interval then fallback value ... if infinite true then infinite loop
        this.dataInterval = this.root.dataset.interval
    }
    
    checkInfinite(current,btn,placed,numsLength){///checks if arrows should be shown
      console.log(current,placed);
      if(current === 0 && this.root.dataset.infinite === 'false' && placed === 'left'){
        btn.style.display = 'none'
        }else if(current === numsLength && this.root.dataset.infinite === 'false' && placed === 'right'){
          btn.style.display = 'none'
        }else{
          btn.style.display = 'block'
        }
      }

    makeBtn(id,img,placed,current,numsLength){///makes arrow btn
        let btn = document.createElement('button');
        btn.setAttribute('class',id);
        let btnImg = document.createElement('img');
        btn.style.position = 'absolute';
        btn.style.top = '50%';
        //
        btnImg.src = img
        btn.appendChild(btnImg)
          if(placed === 'left'){
            btn.style.left = '0'
            this.checkInfinite(current,btn,'left',numsLength)//infinite
          }else{
            btn.style.right = '0'
            this.checkInfinite(current,btn,'right',numsLength)//infinite
          }
        return btn
      }
    
    writeData(data){

      let current = 0;
      let numsLength = data.length;
      
      let dataInfinite = this.root.dataset.infinite//arrows always available
      let dataAnimationType = this.root.dataset.animationType
      let dataBullets = this.root.dataset.bullets
      //make context
        let ctx = document.createElement('div');
        ctx.setAttribute('class','ctx');
        this.root.appendChild(ctx);

        let sliderItemWrapper = document.createElement('div');
        sliderItemWrapper.setAttribute('class','slider-item-wrapper');
        ctx.appendChild(sliderItemWrapper);
        let bulletWrapper = document.createElement('div');


        //one item slide
        // if(this.dataAnimation === 'basic'){
        let slider = document.createElement('div');
        slider.setAttribute('class','slider');
        slider.setAttribute('data-set',current);
        slider.style.backgroundImage = `url(${data[current].img})`
        sliderItemWrapper.appendChild(slider)
        ///slider animation

        dataAnimationType === 'basic' ? '' :
        dataAnimationType === 'fade'  ? slider.style.transition = 'all 1s ease-in-out' : 
        dataAnimationType === 'slide' ? slider.style.animation = 'slide 0.5s forwards' : ''
      
         //elements
        let title = document.createElement('div');
        title.setAttribute('class','title');
        title.innerHTML = data[current].title;
        slider.appendChild(title)

        //bnt left
        
        let btnLeft = this.makeBtn('btn-left',"./assets/arrowback.svg",'left',current,numsLength)
        sliderItemWrapper.appendChild(btnLeft)
        //btnn right
        
        let btnRight = this.makeBtn('btn-right',"./assets/arrowforward.svg",'right',current,numsLength)
        sliderItemWrapper.appendChild(btnRight)


         //explore link\
        let exploreLink = document.createElement('a');
        exploreLink.setAttribute('class','explore_link');
        exploreLink.innerHTML = `<span>${data[current].buttonText}</span>`;
        exploreLink.href = data[current].buttonLink;
        slider.appendChild(exploreLink)
        sliderItemWrapper.append(bulletWrapper)

        
        //add event left
        btnLeft.addEventListener('click',function(e){
        console.log(this);
          
        // slider.style.transition = 'all 1s ease-in-out'

          if(dataInfinite === 'false'){
            if(current === 1){
                btnLeft.style.display = 'none'
            }
          }else{
            if(current -1 < 0){
            current = numsLength;
            }
          }
          
          current = current - 1;
          btnRight.style.display = 'block'

          slider.style.backgroundImage = `url(${data[current].img})`
          title.innerHTML = data[current].title;
          exploreLink.innerHTML = `<span>${data[current].buttonText}</span>`

                // update bullets
          ctx.querySelectorAll('button').forEach(element=>{
              if((current) === Number(element.dataset.set)){
                  element.setAttribute('class','bullets-clicked')
                  ///
              }else{
                  element.removeAttribute('class','bullets-clicked')
              }
            })
        })

        //add event right
        btnRight.addEventListener('click',function(e){
          current = current+1
          if(dataInfinite === 'false'){//check infinite data 
              if(current === numsLength-1){
                btnRight.style.display = 'none'
              }
            }else{           
              if(current >= numsLength ){
              current = 0;
            }
          }
            btnLeft.style.display = 'block'
            slider.style.backgroundImage = `url(${data[current].img})`
            title.innerHTML = data[current].title;
            exploreLink.innerHTML = `<span>${data[current].buttonText}</span>`;

          // this.checkInfinite(current,btnRight,'right',numsLength)
            ctx.querySelectorAll('button').forEach((element)=>{
                if((current) === Number(element.dataset.set)){
                      element.setAttribute('class','bullets-clicked')
                }else{
                      element.removeAttribute('class','bullets-clicked')
                }
              })
        })

    dataBullets === 'false' ? '' :
    data.forEach((element,index) => {


      
        // let bulletWrapper = document.createElement('div');
        bulletWrapper.setAttribute('class','bullet-wrapper');

        let bullet = document.createElement('button');
        bullet.setAttribute('data-set',index);
        bullet.setAttribute('class','bullets');
        bulletWrapper.appendChild(bullet)
        index===0 ? bullet.setAttribute('class','bullets-clicked') : ''

        bullet.addEventListener('click',function(e){
          current = Number(bullet.dataset.set)
        
            slider.style.backgroundImage = `url(${data[current].img})`
            console.log(data[current].title,'current.img',current);
            title.innerHTML = data[current].title;
            exploreLink.innerHTML = `<span>${data[current].buttonText}</span>`;
            e.target.classList.add('bullets-clicked')
            ctx.querySelectorAll('.bullets-clicked').forEach(element=>{
              if(e.target !== element){
                  element.removeAttribute('class','bullets-clicked')
                }
            })
        })
      });
      ///end foreach
      
    }

    getData(){
      fetch(`${this.url}`)
      .then(data=>data.json())
      .then(data=>{this.writeData(data)})}

    init(){
      this.getData()
    }
}


const slider = new Slider('.root','http://localhost:3000/data')
slider.init()
