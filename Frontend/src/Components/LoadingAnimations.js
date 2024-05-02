import { jellyTriangle } from 'ldrs'

jellyTriangle.register()


function PageLoader()
{
    return (

        <div className="loader">
            <l-jelly-triangle
            size="30"
            speed="2.00" 
            color="yellow" 
            />
        </div>
    )
}

export default PageLoader;


// npm install ldrs
// https://uiball.com/ldrs/
