import styles from './Places.module.css'

function Types({ types }) {
    return (
        types.map((type) => (
            <div className={styles.row} key={type.id}>
                <div>{type.name}</div>
                <a href={"/type/"+type.id}>Länk</a>
            </div>
         ))
    );
  }

  export default  Types;