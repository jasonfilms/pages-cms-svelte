# Adding new videos

This is a way to manage adding new videos and editing existing ones.

> [!IMPORTANT]
> This method only works when you're logged in on [GitHub](https://github.com/)!

## Steps

1. Go to: `src` folder > `lib` folder > `data` folder
2. Find the [`videos.json` file](src/lib/data/videos.json)
3. Inside, there will be this format:

```jsonc
[
  {
    "name": "fairy boy",
    "image": "/images/fairyboy.png",
    "src": "https://www.youtube.com/watch?v=lq27_AN47ws"
  },
   // ... truncated for example purposes
  {
     "name": "Disobedience Side by Side",
    "image": "/images/disobedience.png",
    "src": "https://www.youtube.com/watch?v=SbOLUu0hTHk"
  }
]
```
4. Click on the pencil icon in the top right-hand corner.

![edit icon in GitHub](https://github.com/user-attachments/assets/7fab683b-90d0-4488-bf4f-16d1e5cefeab)

5. If you're **adding a new video**, go to the very last item in the list, before the `]` character, and copy + paste the following format:
```jsonc
{
  "name": "video title",
  "image": "/images/thumbnail.png", 
  "src": "https://youtube.com/link here"
}
```
> [!NOTE]
> If you are using custom thumbnails, make sure to upload them into the `static/images` folder. The `"image"` part needs to start with `/images/` and then the entire image file name. For example, `"image": "/images/bardo.png"` shows the [`bardo.png` file](static/images/bardo.png).

> [!TIP]
> For the `src` part, you can link videos on YouTube or Vimeo. There are some limits to uploading videos directly on your site, the max seems to be **50 MB**. You can use Cloudflare, go to R2 Storage, and upload your video there if it doesn't work on YouTube or Vimeo.

6. Double check your file to make sure it's in the correct format. You can use a website like [JSON Formatter](https://jsonformatter.curiousconcept.com) to fix any mistakes.
7. Once you're finished, click the green button to save.

![green button to save](https://github.com/user-attachments/assets/aecf98c9-985f-4854-a99a-46421ac3c435)

And that's it! Feel free to shoot me an email if you need any help.

> [!IMPORTANT]
> **Changes are _not_ immediate!** The website needs to rebuild itself every time you make _any_ changes. You can track the rebuild in Netlify, you might get an email notification if a build fails. In that case, feel free to email me so I can provide some debugging.
