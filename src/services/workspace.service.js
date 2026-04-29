import ServerError from "../helpers/error.helper.js"
import workspaceRepository from "../repository/workspace.repository.js"
import memberWorkspaceService from "./memberWorkspace.service.js"
import workspaceMemberRepository from "../repository/member.repository.js"

class WorkspaceService {
    async create(title, description, url_image, user_id) {
        if (!title || !description || !url_image) {
            throw new ServerError('Todos los campos son obligatorios', 400)
        }
        const workspace_created = await workspaceRepository.create(title, description, url_image)
        await memberWorkspaceService.create(
            user_id, 
            workspace_created._id, 
            'owner'
        )
        return workspace_created
    }
     async getOne(workspace_id) {
        if (!workspace_id) {
            throw new ServerError("Debe proporcionar un id", 400)
        }

        // Si la Id no es valida
      /*   if (!isValidObjectId(workspace_id)) {
            throw new ServerError("Id de espacio de trabajo invalida", 400)
        }
 */
        try {
            // Agregar la lista de miembros
            const workspace = await workspaceRepository.getById(workspace_id)

            // Si el espacio no existe
            if (!workspace) {
                throw new ServerError("El espacio de trabajo no existe", 404)
            }

            return workspace
        } catch (error) {
            throw error
        }
    }
    async update(workspace_id, title, description) {
        if (!workspace_id || !title || !description) {
            throw new ServerError('Todos los campos son obligatorios', 400)
        }
        try {
            const updated_workspace = await workspaceRepository.updateById(workspace_id, { title, description })
            if (!updated_workspace) {
                throw new ServerError('El espacio de trabajo no existe', 404)
            }
            return updated_workspace
        } catch (error) {
            throw error
        }
    }

    async delete(workspace_id) {
        if (!workspace_id) {
            throw new ServerError("Debe proporcionar un id", 400)
        }
        try {
            await workspaceRepository.deleteById(workspace_id)
            await workspaceMemberRepository.deleteByWorkspaceId(workspace_id)
        } catch (error) {
            throw error
        }
    }
}
const workspaceService = new WorkspaceService()
export default workspaceService