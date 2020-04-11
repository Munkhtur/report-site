import React, { Fragment } from 'react';
import RecentPosts from '../posts/RecentPosts';
import CategoriesCards from '../posts/CategoriesCards';

const About = () => {
  return (
    <Fragment>
      <section className='container'>
        <div className=''>
          <h1 className='large'>About the website</h1>
          <p className=''>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id metus
            sed tortor consectetur porttitor ut et urna. Sed aliquam mollis
            erat, ut eleifend urna pharetra ac. Integer ultricies quam velit,
            sit amet aliquam purus fermentum eu. Curabitur cursus ante nulla,
            sit amet viverra neque vehicula vitae. In vehicula ornare congue.
            Curabitur posuere a sapien eget tristique. Quisque vestibulum leo in
            quam consequat tristique. Maecenas porta nulla sit amet orci auctor
            hendrerit.
          </p>
          <p>
            Vestibulum elementum suscipit nulla, eget facilisis orci elementum
            quis. Nunc in suscipit libero, in condimentum sem. Fusce feugiat
            scelerisque quam eu hendrerit. Curabitur sit amet urna semper,
            scelerisque neque eget, laoreet est. Vivamus at vulputate lorem.
            Pellentesque quam massa, auctor nec tellus non, sollicitudin
            malesuada nisi. Duis cursus quam arcu, id feugiat nisl aliquet
            ultrices. Nullam at tortor fermentum, malesuada mauris sit amet,
            ullamcorper nisi. Integer faucibus tempor dolor, eget auctor velit
            faucibus id. Morbi egestas faucibus turpis, et tincidunt purus
            commodo condimentum. Maecenas porta diam ac lacus dictum, vitae
            efficitur justo pretium. Quisque auctor vitae nunc commodo posuere.
            Curabitur vitae varius tellus, vitae auctor diam. Vestibulum sem
            lorem, blandit et urna eu, tincidunt dignissim ipsum. Duis sed
            mauris et erat commodo laoreet nec sit amet velit.
          </p>
          <div className='buttons'></div>
        </div>
      </section>
    </Fragment>
  );
};

export default About;
