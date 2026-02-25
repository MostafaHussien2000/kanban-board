import {
  newTaskDefaultValues,
  taskSchema,
  type TaskSchema,
} from "@/validation/task";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/shared/button";
import { Icons } from "@/components/ui/icon";
import { Form } from "@/components/ui/form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_CONFIG } from "@/config/statuses.config";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import DifficultyRadioGroup from "./difficulty-radio-group";
import { useTasks } from "@/hooks/useTasks";
import type { Task, TaskStatus } from "@/types/task";

interface AddTaskFormProps {
  visible: boolean;
  close: () => void;
  defaultStatus?: TaskStatus;
}

export default function AddTaskForm({
  close,
  defaultStatus,
}: AddTaskFormProps) {
  const form = useForm<TaskSchema>({
    defaultValues: {
      ...newTaskDefaultValues,
      status: defaultStatus ?? newTaskDefaultValues.status,
    },
    resolver: zodResolver(taskSchema),
  });

  const { createMutation, data: tasksData } = useTasks();

  const handleFormSubmission = form.handleSubmit((data) => {
    const tasks = tasksData?.data ?? [];
    const columnTasks = tasks.filter((t) => t.status === data.status);
    const maxOrder = columnTasks.reduce(
      (max, t) => (t.order > max ? t.order : max),
      0,
    );

    createMutation.mutate(
      {
        ...data,
        order: maxOrder + 1000,
      } as Omit<Task, "id">,
      {
        onSuccess: () => {
          close();
          form.reset();
        },
      },
    );
  });

  useEffect(() => {
    if (defaultStatus) {
      form.reset({
        ...newTaskDefaultValues,
        status: defaultStatus,
      });
    }
  }, [defaultStatus, form]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div
      className="w-full h-full fixed bg-black/10 backdrop-blur-sm z-10 p-5 flex items-start justify-center"
      onClick={close}
    >
      <Card
        className="w-full max-w-[500px] shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="font-mono text-lg font-bold">
              ADD NEW TASK
            </CardTitle>
            <button type={"button"} className="cursor-pointer" onClick={close}>
              <Icons.Close size={26} />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form noValidate onSubmit={handleFormSubmission}>
              <FieldGroup>
                <Controller
                  name="title"
                  render={() => (
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="gap-y-1">
                          <FieldLabel>
                            Title <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            placeholder="e.g., Buy milk"
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value as string}
                          />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  )}
                />

                <Controller
                  name={"description"}
                  control={form.control}
                  render={({ field: inputField, fieldState }) => (
                    <Field className="flex-1 gap-y-1">
                      <FieldLabel>
                        Description <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Textarea
                        placeholder="Describe this task..."
                        className="resize-y max-h-[150px] min-h-[75px]"
                        rows={2}
                        {...inputField}
                        value={inputField.value as string}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="priority"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-y-1">
                      <FieldLabel>
                        Priority <span className="text-red-500">*</span>
                      </FieldLabel>
                      <DifficultyRadioGroup
                        value={field.value as string}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-y-1">
                      <FieldLabel>
                        Column <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.entries(STATUS_CONFIG).map(
                              ([key, value]) => (
                                <SelectItem
                                  key={key}
                                  value={key}
                                  className={cn(
                                    "flex items-center gap-2",
                                    `hover:${value.accent}/10`,
                                  )}
                                >
                                  {value.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Button
                  disabled={
                    form.formState.isSubmitting || createMutation.isPending
                  }
                  type="submit"
                  className="font-mono"
                >
                  ADD TASK
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
