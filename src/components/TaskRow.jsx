import Favorite from "./Favorite";

export default function TaskRow({ task, onFavorite, onDelete, onEdit }) {
  return (
    <>
      <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
        <td>
          <Favorite isFavorite={task.isFavorite} onFavorite={onFavorite} />
        </td>
        <td>{task.title}</td>
        <td>
          <div>{task.description}</div>
        </td>
        <td>
          <ul className="flex justify-center gap-1.5 flex-wrap">
            {task.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </td>
        <td className="text-center">High</td>
        <td>
          <div className="flex items-center justify-center space-x-3">
            <button type="button" onClick={onDelete} className="text-red-500">
              Delete
            </button>
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="text-blue-500"
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
