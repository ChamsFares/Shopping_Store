import clothes from "../assets/clothes.jpg";
import laptop from "../assets/laptop.jpg";
import rings from "../assets/rings.jpg";

const ImageCarousel = () => {
  const images = [clothes, laptop, rings];

  const captions = [
    [
      "Image by Kai Pilger on Pexcel",
      "https://www.pexels.com/photo/assorted-clothes-996329/",
    ],

    [
      "Image by freepik",
      "https://www.freepik.com/free-photo/modern-stationary-collection-arrangement_23441437.htm#fromView=search&page=1&position=0&uuid=e1efa232-998a-4990-8d0c-a67599e855b5",
    ],

    [
      "Image by pikisuperstar on Freepik",
      "https://www.freepik.com/free-vector/realistic-black-background-with-realistic-elements_20187420.htm#fromView=search&page=1&position=2&uuid=f7665004-0784-4e33-a507-ee20b1de0868",
    ],
  ];

  const [currentImage, setCurrentImage] = React.useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-7/12 mx-auto">
      <figure className="w-auto max-h-screen rounded-lg ">
        <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
        <caption className="w-max text-xs text-slate-500">
          <a href={captions[currentImage][1]}>{captions[currentImage][0]}</a>
        </caption>
      </figure>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full">
        <button
          onClick={prevImage}
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="bg-gray-800 text-white px-2 py-1 rounded-md"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
