import './ImgTextPair.css'

export default function ImgTextPair({imgSrc, imgText}) {
    return (
        <div className="container">
            <div className="img-cont">
                <img src={imgSrc} className="image" />
            </div>
            <p className="text">{imgText}</p>
        </div>
    );
}