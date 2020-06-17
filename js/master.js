//toggle spin class on item
let cogIcon = document.querySelector(".settings-box .toggle-spin");
cogIcon.onclick = function(){
    document.querySelector(".settings-box .toggle-spin .fa-cog").classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}

//switch colors
let mainColor= localStorage.getItem("color-option");
if(mainColor !=null)
{
    $("h1,h2,h3,h4,h5,h6,p").css("color",mainColor);
            //remove active class from all child
            document.querySelectorAll(".colors-list li").forEach(e=>{
                e.classList.remove("active");
            //add active class on element with data color ===to local storage item
            if(e.dataset.color===mainColor)
            {
                //add active class
                e.classList.add("active");
            }
            });
}
const colorsList =document.querySelectorAll(".colors-list li");
colorsList.forEach(li=> {
    li.addEventListener("click",(e)=>{
        //set color on any thing
        //document.documentElement.style.setProperty("--main--color","e.target.dataset.color");
        $("h1,h2,h3,h4,h5,h6,p,div").css("color",e.target.dataset.color);
        //set colors in local storage
        localStorage.setItem("color-option",e.target.dataset.color);
        //remove active class from all child
        handleActive(e);
    });
});


//switch random background option

let backgroundOption=true;
//variable to control bachground Interval
let backgroundInterval;


const randomBackEl =document.querySelectorAll(".random-background span");
randomBackEl.forEach(span=> {
    span.addEventListener("click",(e)=>{
        /*
        //remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach(e=>{
            e.classList.remove("active");
        });
        // add active class on self
        e.target.classList.add("active");
        */
       handleActive(e);
        if(e.target.dataset.background==='yes')
        {
            backgroundOption=true;
            randomizeImgs();
        }
        else
        {
            backgroundOption=false;
            clearInterval(backgroundInterval);
        }
    });
});

//select landing page elements
let landingPage= document.querySelector(".landig-page");
let imgArray =["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

//function to randomize images
function randomizeImgs()
{
    if(backgroundOption===true)
    {
        backgroundInterval = setInterval(() => {
            //get random number
            let random= Math.floor(Math.random()* imgArray.length);
            landingPage.style.backgroundImage ='url("images/'+imgArray[random]+'")';
        },5000);
    }
}
randomizeImgs();

// select skills selectors
let ourSkills= document.querySelector(".skills");

window.onscroll=function(){
    //skill offset top
    let skillOffsetTop= ourSkills.offsetTop;
    //console.log(skillOffsetTop);
    //skills outer height
    let skillsOuterHeight= ourSkills.offsetHeight;
    //console.log(skillsOuterHeight);
    //skills window height
    let windowHeight= this.innerHeight;
    //console.log(windowHeight);
    //skills scrollTop
    let windowScrollTop= this.pageYOffset;
    //console.log(windowScrollTop);
    if(windowScrollTop> 700)
    {
        let allSkills=document.querySelectorAll(".skills .skill-box .skill-progress div");
        allSkills.forEach(skill=>{
            skill.style.width = skill.dataset.progress;
        });
    }
}

//Gallary

let ourGallary = document.querySelectorAll(".galary .img-box img");

ourGallary.forEach(img => {
    img.addEventListener("click",(e)=>{
        //create overlay element
        let overlay= document.createElement("div");
        // add className to overlay
        overlay.className ="popup-overlay";
        // append overlay to body
        document.body.appendChild(overlay);
        // create popup box
        let popupBox = document.createElement('div');
        //add calssName 
        popupBox.className="popup-box";
        //add header to image
        let imgHeading= document.createElement("h2");
        imgHeading.className="imgHeading";
        //create text for heading
        let imgText=document.createTextNode(img.alt);
        //append text to the heading
        imgHeading.appendChild(imgText);
        //append heading to the popup box
        popupBox.appendChild(imgHeading);
        //create image
        let popupImage=document.createElement("img");
        //console.log(img.src);
        popupImage.src=img.src;
        popupBox.appendChild(popupImage);
        //append popup box to body
        document.body.appendChild(popupBox);
        let closedButton=document.createElement("span");
        closedButton.className="closedButton";
        let buttonName=document.createTextNode("X");
        closedButton.appendChild(buttonName);
        popupBox.appendChild(closedButton);
    });
});

//remove popoup

document.addEventListener("click",(e)=>{
    if(e.target.className=='closedButton')
    {
        document.querySelector(".popup-overlay").remove();
        document.querySelector(".popup-box").remove();
    }
})

// select all bullets

let allBullets =document.querySelectorAll(".nav-bullets .bullet");
// allBullets.forEach(bullet=>{
//     bullet.addEventListener("click",(e)=>{
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         });
//     })
// })


let links =document.querySelectorAll(".links a");
// links.forEach(link=>{
//     link.addEventListener("click",(e)=>{
//         e.preventDefault();
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: 'smooth'
//         });
//     })
// })

function scrollSection(element)
{
    element.forEach(bullet=>{
    bullet.addEventListener("click",(e)=>{
        e.preventDefault();
        //e.target.style.background='red';
        /*
        e.target.parentElement.querySelectorAll(".active1").forEach(el=>{
            el.classList.remove("activ1");
            el.target.classList.add("active1");
        });
        */
       allBullets.forEach(el=>{
           el.classList.remove("active1");
           e.target.classList.add("active1");
       })
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth',
        });
    })
})
window.scrollIntoView({
    behavior: 'smooth',
})
}
scrollSection(allBullets);
scrollSection(links);

let bulletSpan=document.querySelectorAll(".bullet-option span");

let bulletContainer=document.querySelector(".nav-bullets");

let bulletLocalItm=localStorage.getItem("bullets_options");
if(bulletLocalItm!=null)
{
    bulletSpan.forEach(span=>{
        span.classList.remove("active");
    });
    if(bulletLocalItm==='block')
    {
        bulletContainer.style.display='block';
        document.querySelector(".bullet-option .yes").classList.add('active');
    }
    else{
        bulletContainer.style.display='none';
        document.querySelector(".bullet-option .no").classList.add('active');
    }
}

bulletSpan.forEach(span=>{
    span.addEventListener("click",(e)=>{
        if(span.dataset.display ==='yes'){
            bulletContainer.style.display='block';
            localStorage.setItem("bullets_options",'block');
        }
        else{
            bulletContainer.style.display='none';
            localStorage.setItem("bullets_options",'none');
        }
        handleActive(e);
    })
})

//Add active class on self

function handleActive (ev)
{
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active");
        ev.target.classList.add("active");
    })
}

document.querySelector(".reset").onclick =function () {
    localStorage.clear();
    //localStorage.remove("color-option");
    window.location.reload();
  }

  //toggle menu

  let toggleBtn=document.querySelector('.fa-bars');
  let navLinks=document.querySelector(".links");

  toggleBtn.onclick=function()
  {
      alert("KJHG");
      console.log("mostafa");

    //   links.classList.toggle('manu-active');

    //   navLinks.classList.toggle('open');
  }
  /*our review */

  // local reviews data
const reviews = [
    {
      id: 1,
      name: "susan smith",
      job: "web developer",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
      text:
        "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: "anna johnson",
      job: "web designer",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg",
      text:
        "Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.",
    },
    {
      id: 3,
      name: "peter jones",
      job: "intern",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
      text:
        "Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.",
    },
    {
      id: 4,
      name: "bill anderson",
      job: "the boss",
      img:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg",
      text:
        "Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
    },
  ];
  // select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;
window.addEventListener("DOMContentLoaded",function(){
    showPerson(currentItem);
});

// show person based on item
function showPerson (person) {
    const reviewItem=reviews[person];
    img.src=reviewItem.img;
    author.textContent=reviewItem.name;
    job.textContent=reviewItem.job;
    info.textContent=reviewItem.text;
  }

  // show next person

  nextBtn.addEventListener("click",function(){
    if(currentItem>reviews.length-1)
    {
        currentItem=0;
    }
    else{
      currentItem++;
    }
      showPerson(currentItem);
  });

  // show prev person
  prevBtn.addEventListener("click",function(){
      if(currentItem<0)
      {
          currentItem=reviews.length-1;
      }
      else{
        currentItem--;
      }
      showPerson(currentItem);
});

// show random person
randomBtn.addEventListener("click",function(){
    currentItem=Math.round(Math.random()*reviews.length);
    showPerson(currentItem);
});