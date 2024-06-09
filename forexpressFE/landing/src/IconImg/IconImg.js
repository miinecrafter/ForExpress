import './IconImg.css';

export default function IconImg({img, titleText, desc}) {
    return (
        <div className="icon-cont">
            <div className="icon-img-cont">
                <img className="icon-img" src={img} />
            </div>
            <p className="icon-text">{titleText}</p>
            <p className="icon-desc">{desc}</p>
        </div>
    );
}