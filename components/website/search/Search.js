import { useRef, useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form";
import asset from "plugins/assets/asset";
export default function Search({
    handleSearch,
}) {

    const [status, setStatus] = useState(false);
    // const searchRef = useRef();
    let defaultValue = {
        "valueSearch" : null
    }

    const { register, handleSubmit, reset, control } = useForm( defaultValue );

    const onSubmit = (data, e) => {
        console.log(data, e);
        if (handleSearch) {
            handleSearch()
        } else {
            console.log("Submit ==> value search: ", data);
            reset({...defaultValue});
        }
        handleClick();
    }

    const onError = (errors, e) => console.log(errors, e);

    const handleClick = () => {
        setStatus(!status)
    }

    return <div className={`${status === true ? "active formSearch" : "formSearch"}`}>

        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="17.555" height="17.559" viewBox="0 0 17.555 17.559">
            <path id="Icon_ionic-ios-search" data-name="Icon ionic-ios-search" d="M21.849,20.781l-4.882-4.928a6.958,6.958,0,1,0-1.056,1.07l4.85,4.9a.751.751,0,0,0,1.061.027A.756.756,0,0,0,21.849,20.781Zm-10.35-3.8a5.494,5.494,0,1,1,3.886-1.609A5.46,5.46,0,0,1,11.5,16.983Z" transform="translate(-4.5 -4.493)" fill="#103c55" />
        </svg>
        <label onClick={handleClick} htmlFor="search">Tìm kiếm</label>
        
        <div className="contentSearch">
            <div className="closeForm" onClick={handleClick}></div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <h3>Nhập tên sản phẩm cần tìm</h3>
                {/* <Controller
                    as={<input id="search"/>}
                    name="valueSearch" 
                    control={control}
                    defaultValue=""
                    ref={register}
                    /> */}
                <input id="search" name="valueSearch" ref={register} />
                <button type="submit" className="btn">Tìm kiếm</button>
            </form>
        </div>

        <style jsx>{`
        .formSearch{
            overflow: hidden;
            transition: all 0.4s ease;
            .contentSearch{
                position: absolute;
                background-color: rgba(255,255,255,1);
                width: 100%;
                height: 150px;
                top: -100px;
                left: 0;
                height: 0;
                opacity: 0;
                transition: 0.4s;
                
            }
            label{
                padding-left: 15px;
                cursor: pointer;
            }
            .btn{
                border: 0;
                padding: 10px 30px;
                border-radius: 20px;
                background-color: #FD7669;
                display: flex;
                cursor: pointer;
                color: #fff;
                outline: none;
                margin-left: -10px;
                box-shadow: 0 10px 20px rgba(253, 118, 105,0.2);
                transition: all 0.5s ease-in-out;
                &:focus{
                    border: 0;
                }
                &:hover{
                    box-shadow: 0 10px 15px rgba(253, 118, 105, 0.5);
                }
            }
            form{
                width: 50%;
                height: 120px;
                opacity: 0;
                display: flex;
                align-items: center;
                transition: all 0.8s ease 0.3s;
                justify-content: center;
                align-items: center;
                transition: all 1s ease 0.3s;
                z-index: 999;
                background-color: rgba(255,255,255,1);
                flex-wrap: wrap;
                padding-bottom: 10px;
                padding-top: 20px;
                h3{
                    width: 100%;
                    text-align: center;
                    font-family: "Montserrat-SemiBold";
                    color: #103C55;
                }
                input{
                    height: 37px;
                    outline: none;
                    border: unset;
                    border: solid 1px #103C55;
                    border-radius: 20px;
                    border-right: unset;
                    border-top-right-radius: unset;
                    border-bottom-right-radius: unset;
                    margin-right: -10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    transition: 0.3s;
                    &:focus{
                        border: solid 1px #FD7669;;
                    }
                }
            }
           
        }
        .active.formSearch{
            overflow: unset;
            transition: 0.4s;
            lable{
                display: none;
            }
            .contentSearch{
                top: 0;
                /* left: 0; */
                height: 100px;
                opacity: 1;
                z-index: 999;
            }
            form{
                position: fixed;
                width: 100%;
                opacity: 1;
            }
            .closeForm{
                position: fixed;
                width: 100vw;
                height: 100vh;
                background-color: rgba(255,255,255,0.6);
                z-index: 1;
            }
        }
      `}</style>
    </div>
}