import styles from './Places.module.css'

function Places({ places }) {
    return (
        places.map((place) => (
            <div className={styles.row} key={place.id}>
                <div>{place.name}</div>
                <div>{place.longest}</div>
                <a href={"/skjutbanor/"+place.url}>Länk</a>
            </div>
         ))
    );
  }

  export default  Places;