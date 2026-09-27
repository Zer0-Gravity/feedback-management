function DeletePost({selected) {
    return (
        <div>
            {selectedRows.rows.length !== 0 && (
                <div className="flex gap-2 items-center">
                    <p className="text-primary-text text-[12px]">{`${selectedRows.rows.length} out off ${table.getPreSelectedRowModel().rows.length} selected`}</p>

                    <button
                        onClick={() =>
                            DeletePost(
                                selectedRows.rows.flatMap((r) => r.id), // Get each selected row id
                            )
                        }
                        className="bg-red-500 px-2 py-1 rounded-md text-[14px] text-white active:scale-95"
                    >
                        Delete {selectedRows.rows.length}
                    </button>
                </div>
            )}
        </div>
    );
}

export default DeletePost;
