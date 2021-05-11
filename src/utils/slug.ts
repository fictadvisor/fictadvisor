import slugify from 'slugify';

const slug = (value) => slugify(value,
    {
        replacement: '-',
        lower: true
    }
).replace(/[\.\(\)']/g, '').replace(/--/g, '-');

export { slug };
