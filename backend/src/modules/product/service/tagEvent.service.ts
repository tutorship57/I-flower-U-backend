import tagEventRepository from "../repository/tagEvent.repository";
import { redis } from "../../../shared/redis/redis.service";
import { bufferCheck } from "../../../shared/utils/cache.util";

const getAllTagEventsService = async () => {
    const cacheKey = "tagEvents:all";
    const cachedTagEvents = await redis.get(cacheKey);
    if (cachedTagEvents) {
        const parsedCache = bufferCheck(cachedTagEvents);
        return JSON.parse(parsedCache);
    }
    const tagEvents = await tagEventRepository.getAllTagEvents();
    await redis.setEx(cacheKey, 300, JSON.stringify(tagEvents));
    return tagEvents;
}

const getTagEventService = async (tag_id: number) => {
    const tagEvent = await tagEventRepository.getTagEventById(tag_id);
    return tagEvent;
}

const createTagEventService = async (data: { tag_event_name: string; }) => {
    const newTagEvent = await tagEventRepository.createTagEvent(data);
    const cacheKey = "tagEvents:all";
    await redis.del(cacheKey);
    return newTagEvent;
}

const updateTagEventService = async (tag_id: number, data: { tag_event_name?: string; }) => {
    const updatedTagEvent = await tagEventRepository.updateTagEvent(tag_id, data);
    const cacheKey = "tagEvents:all";
    await redis.del(cacheKey);
    return updatedTagEvent;
}

const deleteTagEventService = async (tag_id: number) => {
    const deletedTagEvent = await tagEventRepository.deleteTagEvent(tag_id);
    const cacheKey = "tagEvents:all";
    await redis.del(cacheKey);
    return deletedTagEvent;
}

export { getAllTagEventsService, getTagEventService, createTagEventService, updateTagEventService, deleteTagEventService };