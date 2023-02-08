import ProductItem from './ProductItem';
import classes from './Products.module.css';

const TEST_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Self-titled Album',
    description: 'First album'
  },
  {
    id: 'p2',
    price: 10,
    title: 'Second Album',
    description: 'Second album'
  },
  {
    id: 'p3',
    price: 20,
    title: 'Third Album',
    description: 'Third album'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {TEST_PRODUCTS.map(product => {
          return <ProductItem key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        })}
      </ul>
    </section>
  );
};

export default Products;
