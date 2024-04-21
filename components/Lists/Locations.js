import styles from './Places.module.css'

function Locations({ locations }) {
    return (
        locations.map((location) => (
            <div className={styles.row} key={location.id}>
                <div>{location.name}</div>
                <a href={location.name}>Länk</a>
            </div>
         ))
    );
  }

  export default  Locations;