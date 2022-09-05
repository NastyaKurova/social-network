import {fireEvent, render, screen} from "@testing-library/react";
import ProfileStatus from "./ProfileStatus";

describe("Test Profile status component", () => {
    test("show status from props", () => {
        const status = 'profile status'
        render(<ProfileStatus status={status} isOwner={true} updateProfileStatus={() => {
        }}/>)
        expect(screen.getByRole("status")).toHaveTextContent(status)
    });

    test("show empty status", () => {
        render(<ProfileStatus status={null} isOwner={true} updateProfileStatus={() => {
        }}/>)
        expect(screen.getByRole("status")).toHaveTextContent('empty status')
    });

    test("do nothing if not isOwner", () => {
        const status = "my status"
        render(<ProfileStatus status={status} isOwner={false} updateProfileStatus={() => {
        }}/>)
        const statusOnPage = screen.queryByRole("status")

        fireEvent.doubleClick(statusOnPage)
        const statusOnPage1 = screen.queryByRole("status")
        const input = screen.queryByRole("status-input")
        expect(statusOnPage1).toHaveTextContent(status)
        expect(input).not.toBeInTheDocument()
    });

    test("show input after double click and hide after on blur", () => {
        const status = 'profile status'
        render(<ProfileStatus status={status} isOwner={true} updateProfileStatus={() => {
        }}/>)
        const statusOnPage = screen.queryByRole("status")
        const input = screen.queryByRole("status-input")

        expect(statusOnPage).toHaveTextContent(status)
        expect(input).not.toBeInTheDocument()

        fireEvent.doubleClick(statusOnPage)

        const statusOnPage1 = screen.queryByRole("status")
        const input1 = screen.queryByRole("status-input")
        expect(input1).toBeInTheDocument()
        expect(input1).toHaveValue(status)
        expect(statusOnPage1).not.toBeInTheDocument()

        fireEvent.blur(input1)
        const statusOnPage2 = screen.queryByRole("status")
        const input2 = screen.queryByRole("status-input")
        expect(statusOnPage2).toHaveTextContent(status)
        expect(input2).not.toBeInTheDocument()
    });

    test("type another status", () => {
        const status = 'profile status'
        render(<ProfileStatus status={status} isOwner={true} updateProfileStatus={jest.fn()}/>)
        const statusOnPage = screen.queryByRole("status")
        const input = screen.queryByRole("status-input")

        expect(statusOnPage).toHaveTextContent(status)
        expect(input).not.toBeInTheDocument()

        fireEvent.doubleClick(statusOnPage)
        const statusOnPage1 = screen.queryByRole("status")
        const input1 = screen.queryByRole("status-input")

        expect(input1).toBeInTheDocument()
        expect(input1).toHaveValue(status)
        expect(statusOnPage1).not.toBeInTheDocument()

        const newStatus = 'new status'
        fireEvent.change(input1, {target: {value: newStatus}})
        expect(input1).toHaveValue(newStatus)

        fireEvent.blur(input1)
        expect(input1).not.toBeInTheDocument()

    });
})