import Cookies from "js-cookie";

export default function Loading(){

  window.addEventListener('load',()=>{
    if(Cookies.get('in_access')) {
      if(document.querySelector('#loading') != null){
        document.querySelector('#loading').style.display = 'none';
      }
    } else {
      document.querySelector('body').classList.add('is-loaded');
      if(document.querySelector('#loading') != null){
        setTimeout(() => {
          document.querySelector('#loading').style.display = 'none';
        }, 3000);
      }
      Cookies.set('in_access','check');
    }
  });
}
