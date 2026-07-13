import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { publishBlog, updatingBlog } from "shaurya-zod-medium";

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}

export const blogBlobber = new Hono<{
    Bindings: Bindings,
    Variables: {
      userId: string
    }
}>()

blogBlobber.use(
    '/*', async (c, next) => {
        const jwt = c.req.header('Authorization')
        if (!jwt) {
            c.status(401);
            return c.json({ error: "TRYA ENTER WITHOUT PERMISSION HUH??" });
        }
        const token = jwt.split(' ')[1];
        const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
        if (!payload) {
            c.status(401);
            return c.json({ error: "TRYA ENTER WITHOUT PERMISSION HUH??" });
        }
        c.set('userId', payload.id as string);
        await next()
    }

    // OR

    // app.use('/blog/*', async (c, next) => {
    //   const jwtMiddleware = jwt({
    //     secret: c.env.JWT_SECRET,
    //     alg: 'HS256',
    //   })
    //   return jwtMiddleware(c, next)
    // })
)

blogBlobber.post('/', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const userId = c.get('userId');

  const blog = await c.req.json();

  const parsed = publishBlog.safeParse(blog);
  if(!parsed.success){
    c.status(403);
    return c.json({
      "message"  : "SERIOUSLY? YOU CANT EVEN DO THIS RIGHT?"
    })
  }else{
    try{
      const post = await prisma.post.create({
		  data: {
	    		title: blog.title,
	    		content: blog.content,
	    		authorId: userId
	    	}
	    });
    
	    c.text('BLOG SUCCESSFULLLY PUBLISHED!!!');
      return c.json({
        id: post.id
      })
    }catch(e){
      c.status(511);
      console.log(e);
      return c.json({
        "message"  : "There was some problem from our side, try again please"
      })
    }
  }
})

blogBlobber.put('/', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const blog = await c.req.json();
  const userId = c.get('userId');

  const parsed = updatingBlog.safeParse(blog);

  if(!parsed.success){

  }else{
    try{
      const updatedPost = await prisma.post.update({
        where: {
          id: blog.id,
          authorId: userId
        },
        data: {
          title: blog.title,
	    		content: blog.content
        }
      });

      
      return c.text('YOU SHOULD DO THINGS RIGHT IN THE FIRST TIME YOU STUPID PERSON');
    }catch(e){
      c.status(503);
      console.log(e);
      return c.text("Something went wrong from our side, pelase wait for some time till you try again .")
    }
  }
})

blogBlobber.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const posts = await prisma.post.findMany({});

	return c.json(posts);
})

blogBlobber.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const id = c.req.param('id');
  const userId = c.get('userId');

  const blogPost = await prisma.post.findUnique({
    where: { 
      id: id,
      authorId: userId    
    },
  });

  c.text ("Here you go!!!");
  return c.json(blogPost);

})

