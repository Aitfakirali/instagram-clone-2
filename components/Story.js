function Story({ username, image }) {
  return (
    <div>
      <img
        className="h-14 w-14 rounded-full p-[1.5px] border-red-400 border-2 object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        src={image}
        alt="story pic"
      />
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}

export default Story;
