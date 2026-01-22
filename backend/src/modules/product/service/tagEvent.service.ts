import tagEventRepository from "../repository/tagEvent.repository";

const getAllTagEventsService = async () => {
    const tagEvents = await tagEventRepository.getAllTagEvents();
    return tagEvents;
}

const getTagEventService = async (tag_id: number) => {
    const tagEvent = await tagEventRepository.getTagEventById(tag_id);
    return tagEvent;
}

const createTagEventService = async (data: { tag_event_name: string; }) => {
    const newTagEvent = await tagEventRepository.createTagEvent(data);
    return newTagEvent;
}

const updateTagEventService = async (tag_id: number, data: { tag_event_name?: string; }) => {
    const updatedTagEvent = await tagEventRepository.updateTagEvent(tag_id, data);
    return updatedTagEvent;
}

const deleteTagEventService = async (tag_id: number) => {
    const deletedTagEvent = await tagEventRepository.deleteTagEvent(tag_id);
    return deletedTagEvent;
}

export { getAllTagEventsService, getTagEventService, createTagEventService, updateTagEventService, deleteTagEventService };