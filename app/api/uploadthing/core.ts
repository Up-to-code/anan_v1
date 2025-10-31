import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "128MB",
      maxFileCount: 10,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file }) => {
      const f = file as unknown as { ufsUrl?: string; url?: string; key?: string; name?: string };
      const url = f.ufsUrl ?? f.url;
      const id = f.key ?? f.name ?? '';
      console.debug('[UPLOADTHING][COMPLETE]', { id, url });
      return { url, id };
    }),
  fileUploader: f({
    blob: {
      maxFileSize: '64MB',
      maxFileCount: 5,
    },
  }).middleware(async ({ req }) => {
    const user = await auth(req);
    if (!user) throw new UploadThingError('Unauthorized');
    return { userId: user.id };
  }).onUploadComplete(async ({ file }) => {
    const f = file as unknown as { ufsUrl?: string; url?: string; key?: string; name?: string; size?: number };
    return { id: f.key ?? f.name ?? '', url: f.ufsUrl ?? f.url, name: f.name, size: f.size };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
