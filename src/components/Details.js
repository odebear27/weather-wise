import "./Details.css";
import "./Main.css";

import { WiDaySunny, WiSnowflakeCold, WiThermometer, WiBarometer } from "react-icons/wi";

function Details({ feels_like, temp_min, temp_max, speed, isCelsius }) {
    const cards = [
        {
            id: 1,
            icon: <WiSnowflakeCold size={32} />,
            title: 'min',
            data: temp_min,
            unit: isCelsius ? '°C' : 'F'
        },
        {
            id: 2,
            icon: <WiDaySunny size={32} />,
            title: 'max',
            data: temp_max,
            unit: isCelsius ? '°C' : 'F'
        },
        {
            id: 3,
            icon: <WiThermometer size={32} />,
            title: 'feels like',
            data: feels_like,
            unit: isCelsius ? '°C' : 'F'
        },
        {
            id: 4,
            icon: <WiBarometer size={32} />,
            title: 'wind speed',
            data: speed,
            unit: 'km/h'
        }
    ]
    
    return (
        <div className="section section__details">
            {cards.map(({ id, icon, title, data, unit }) => (
                <div className="card" key={id}>
                    <div className="details__card-icon">
                        <div className="details__icon">
                            {icon}
                        </div>
                        
                        <h4>{title}</h4>
                        <h3>{data}</h3>
                        <h4>{unit}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Details;