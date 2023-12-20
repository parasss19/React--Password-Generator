import { useCallback, useState, useEffect } from 'react'

// function App() {
//   const [password, setPassword] = useState("")    
//   const [length, setLength] = useState(5)            //update length
//   const [numAllow, setnumAllow] = useState(false)    //update num allowed or not(initially not allowed in generated pass so set false)
//   const [charAllow, setcharAllow] = useState(false)  //update char allowed or not(initially not allowed in generated pass so set false)


//   //Password generator function 
//   //hook we use here = useCallback(function , dependencies)  

//    const passGenerator = useCallback(()=>{

//     //in password we contain the generated password
//     let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";     
//     let pass = "";

//     if(numAllow) str += '0123456789'         //if numAllow is true then add number in str
//     if(charAllow) str += '!@#%^&*()~{}[]'    //if charAllow is true then add character in str

//     //this loop is used to pick the values from "str" and put it in "pass" variable and the length of str depends on the "length" state
//      for(let i = 1; i<= length; i++){
//       //now we pic the index value of array 
//       let char = Math.floor(Math.random() * str.length + 1)
//       //now we pick the character from str 
//       pass += str.charAt(char)
//      }
//      setPassword(pass)

//    }, [length, numAllow, charAllow,setPassword] )

  
//    //now we cannot directly run the passwordGenerator function as this function calls many times --> like if we check uncheck numbers then run this function ,,and if we check uncheck char then run this function
//    //so we use = useEffect (function, dependencies) hook

//    //useEffect = it run at the time of loading page and re run the given function whenever the given dependencies changed
//    useEffect(()=>{
//      passGenerator()
//    },[length, numAllow, charAllow, passGenerator])

//    //password copy to clipboar
//    const copyPassword = useCallback(()=>{
//      window.navigator.clipboard.writeText(password)
//    }, [password])

// above code is for revision hai with proper comments below code is clean code without comments


function App() {
  const [password, setPassword] = useState("")    
  const [length, setLength] = useState(5)           
  const [numAllow, setnumAllow] = useState(false)   
  const [charAllow, setcharAllow] = useState(false)  
 
  //Password generator function 
   const passGenerator = useCallback(()=>{
     let pass = "";
     let str = "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";     

    if(numAllow) str += '0123456789'         
    if(charAllow) str += '!@#%^&*()~{}[]'    
 
     for(let i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
     }

     setPassword(pass)
   }, [length, numAllow, charAllow,setPassword] )

  //pass generator
   useEffect(()=>{
     passGenerator()
   },[length, numAllow, charAllow, passGenerator])

   //password copy to clipboar
   const copyPassword = useCallback(()=>{
     alert("Password copied")
     window.navigator.clipboard.writeText(password)
   }, [password])


  return (
    <>
    <div className='w-full max-w-xl  rounded-lg shadow-xl px-5 py-3  mt-52 mx-auto bg-gray-600/60'>
      
      <h1 className='text-white text-center pb-6 text-3xl'>Password Generator</h1>

      {/*div for password input and copy button*/}
      <div className='flex rounded-lg overflow-hidden '>
        {/* password  */}
        <input 
        className='outline-none w-full px-2 py-3'
        type="text" 
        value={password}
        placeholder='Password'
        readOnly
        // ref={passwordRef}   //useRef hook ko reference denge
        />
        
        {/* button */}
        <button onClick={copyPassword} className='bg-amber-700 outline-none text-white px-3 py-1 shrink-0 hover:bg-amber-400'>Copy</button>
        </div>


       {/*for length ,num, char*/}
       <div className='flex text-sm gap-x-3 my-5'>
        
        {/* Length */}
        <div className='flex items-center '>
         <input 
         className='cursor-pointer'
         type="range" 
         min={5}
         max={20}
         value={length}
         onChange={ (event)=>{
            //console.log(event.target.value)
             setLength(event.target.value)
         }}
         />
        </div>
        <label className='text-orange-300 font-semibold'> Length: {length}</label>


        {/* number */}
        <div className='flex items-center'>
         <input 
         type='checkbox'
         defaultChecked={numAllow}
         onChange={() => {
             setnumAllow((prev)=> !prev 
             )
         }}
         />
        </div>
        <label className='text-orange-300 font-semibold'>Numbers</label>


        {/* char */}
        <div className='flex items-center'>
         <input 
         type='checkbox'
         defaultChecked={charAllow}
         onChange={() => {
             setcharAllow((prev)=> !prev
             )
         }}
         />
        </div>
        <label className='text-orange-300 font-semibold'>Character</label>

       </div>

    </div>
    </>
  )
}
export default App
